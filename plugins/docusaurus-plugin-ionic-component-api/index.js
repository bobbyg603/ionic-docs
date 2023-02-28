const fetch = require('node-fetch');
const fs = require('fs');

module.exports = function (context, options) {
  return {
    name: 'docusaurus-plugin-ionic-component-api',
    async loadContent() {
      // Finds the plugin options for @docusaurus/plugin-content-docs
      const docsPluginOptions = context.siteConfig.plugins.find(
        (plugin) => Array.isArray(plugin) && plugin[0] === '@docusaurus/plugin-content-docs'
      )[1];

      const data = [];

      for (const version of Object.keys(docsPluginOptions.versions)) {
        const versionData = docsPluginOptions.versions[version];
        /**
         * If the version has an unreleased banner option enabled, we treat it as the next version,
         * with the @next npm tag. Otherwise, we parse the version from the key of the versions object.
         */
        const npmTag =
          typeof versionData.banner !== 'undefined' && versionData.banner === 'unreleased'
            ? '@next'
            : `@${version.slice(1)}`;

        const response = await fetch(`https://unpkg.com/@ionic/docs${npmTag}/core.json`);
        const { components } = await response.json();

        const names = components.map((component) => component.tag.slice(4));
        // matches all relative markdown links to a component, e.g. (../button)
        COMPONENT_LINK_REGEXP = new RegExp(`\\(../(${names.join('|')})/?(#[^)]+)?\\)`, 'g');

        components.forEach((comp) => {
          const compTag = comp.tag.slice(4);
          const versionPath = versionData.path ?? version;
          const outDir = getDirectoryPath(compTag, versionPath, version === 'current');

          data.push({
            outDir,
            componentTag: compTag,
            version: versionPath,
            props: renderProperties(comp),
            events: renderEvents(comp),
            methods: renderMethods(comp),
            parts: renderParts(comp),
            customProps: renderCustomProps(comp),
            slots: renderSlots(comp),
          });
        });
      }

      return data;
    },
    async contentLoaded({ content, actions }) {
      const { createData } = actions;
      const promises = [];

      for (const data of content) {
        const basePath = `${data.version}/${data.componentTag}`;
        /**
         * createData will create a file within the generated ./docusaurus
         * directory within the plugin directory.
         */
        promises.push(
          createData(`${basePath}/props.md`, data.props),
          createData(`${basePath}/events.md`, data.events),
          createData(`${basePath}/methods.md`, data.methods),
          createData(`${basePath}/parts.md`, data.parts),
          createData(`${basePath}/custom-props.md`, data.customProps),
          createData(`${basePath}/slots.md`, data.slots)
        );
      }

      await Promise.all(promises);
    },
  };
};

/**
 * Calculates the path to the directory where the auto-generated markdown files are stored.
 * @param {*} componentTag The tag name of the component, e.g.: ion-button
 * @param {*} version The version of Ionic that the file pertains to, e.g.: v6
 * @param {*} isCurrentVersion Whether the version is the current version of the docs
 * @returns The path to the directory where the auto-generated markdown files are stored.
 */
function getDirectoryPath(componentTag, version, isCurrentVersion) {
  if (isCurrentVersion) {
    return `./docs/api/auto-generated/${componentTag}`;
  }
  return `./versioned_docs/version-${version}/api/auto-generated/${componentTag}`;
}

/**
 * Creates a markdown file and writes the contents to file in the static/auto-generated
 * directory.
 * @param {*} outDir The directory where the markdown file will be written.
 * @param {*} fileName The name of the generated markdown file, excluding the extension.
 * @param {*} data The data to write to the markdown file.
 */
function writeAutoGeneratedPage(outDir, fileName, data) {
  const path = `${outDir}/${fileName}.md`;
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path, data);
}

/**
 * Formats line breaks in a multiline string to be displayed in a table.
 * @param {*} str The string to format
 * @returns The formatted string
 */
function formatMultiline(str) {
  return str.split('\n\n').join('<br /><br />').split('\n').join(' ');
}

function renderProperties({ props: properties }) {
  if (properties.length === 0) {
    return 'No properties available for this component.';
  }

  // NOTE: replaces | with U+FF5C since MDX renders \| in tables incorrectly
  return `
${properties
  .map((prop) => {
    const isDeprecated = prop.deprecation !== undefined;

    const docs = isDeprecated ? `${prop.docs}\n_Deprecated_ ${prop.deprecation}` : prop.docs;

    return `
### ${prop.name} ${isDeprecated ? '(deprecated)' : ''}

| | |
| --- | --- |
| **Description** | ${formatMultiline(docs)} |
| **Attribute** | \`${prop.attr}\` |
| **Type** | \`${prop.type.replace(/\|/g, '\uff5c')}\` |
| **Default** | \`${prop.default}\` |

`;
  })
  .join('\n')}`;
}

function renderEvents({ events }) {
  if (events.length === 0) {
    return 'No events available for this component.';
  }

  return `
| Name | Description |
| --- | --- |
${events.map((event) => `| \`${event.event}\` | ${formatMultiline(event.docs)} |`).join('\n')}

`;
}

function renderMethods({ methods }) {
  if (methods.length === 0) {
    return 'No public methods available for this component.';
  }

  // NOTE: replaces | with U+FF5C since MDX renders \| in tables incorrectly
  return `
${methods
  .map(
    (method) => `
### ${method.name}

| | |
| --- | --- |
| **Description** | ${formatMultiline(method.docs)} |
| **Signature** | \`${method.signature.replace(/\|/g, '\uff5c')}\` |
`
  )
  .join('\n')}

`;
}

function renderParts({ parts }) {
  if (parts.length === 0) {
    return 'No CSS shadow parts available for this component.';
  }

  return `
| Name | Description |
| --- | --- |
${parts.map((prop) => `| \`${prop.name}\` | ${formatMultiline(prop.docs)} |`).join('\n')}

`;
}

function renderCustomProps({ styles: customProps }) {
  if (customProps.length === 0) {
    return 'No CSS custom properties available for this component.';
  }

  return `
| Name | Description |
| --- | --- |
${customProps.map((prop) => `| \`${prop.name}\` | ${formatMultiline(prop.docs)} |`).join('\n')}

`;
}

function renderSlots({ slots }) {
  if (slots.length === 0) {
    return 'No slots available for this component.';
  }

  return `
| Name | Description |
| --- | --- |
${slots.map((slot) => `| \`${slot.name}\` | ${formatMultiline(slot.docs)} |`).join('\n')}

`;
}
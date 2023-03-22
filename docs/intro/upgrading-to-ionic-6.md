# Ionic 6へのアップデート

あなたのIonic5でつくったアプリをIonic6にアップデートする方法を案内します。

## はじめ方

### Angular

1. Ionic 6 は Angular 12+ をサポートしています。 [Angular Update Guide](https://update.angular.io/) に沿って、最新バージョンのAngularに更新します。.
2. Ionic6の最新バージョンに更新します。

```shell
npm install @ionic/angular@6
```

Ionic Angular Serverを使用している場合は、それも必ず更新してください:

```shell
npm install @ionic/angular@6 @ionic/angular-server@6
```

3. `Config.set()` を削除します。そして代わりに `IonicModule.forRoot()` を使いましょう。くわしくは [Angular Config Documentation](../developing/config) をご覧ください。
4. 以前に `@ionic/angular` からエクスポートされた `setupConfig` 関数の使用をすべて削除します。代わりに `IonicModule.forRoot()` で設定を行います。

### React

1. Ionic 6 は React 17+ をサポートしています。Reactの最新バージョンに更新します:

```shell
npm install react@latest react-dom@latest
```

2. Ionic 6 の最新バージョンに更新します:

```shell
npm install @ionic/react@6 @ionic/react-router@6
```

3. `package.json` の `scripts` オブジェクトにある `test` フィールドを更新して、 `transformIgnorePatterns` を含めます:

```json
"scripts": {
  "test": "react-scripts test --transformIgnorePatterns 'node_modules/(?!(@ionic/react|@ionic/react-router|@ionic/core|@stencil/core|ionicons)/)'",
  ...
}
```

4. あなたの `App` コンポーネントで `setupIonicReact` を呼び出して下さい。もう `setupConfig` を利用している場合は、 `setupIonicReact` に置き換えてください:

**Before**
```tsx title="App.tsx"
import { setupConfig } from '@ionic/react';

...

setupConfig({
  mode: 'md'
});
```

**After**
```tsx title="App.tsx"
import { setupIonicReact } from '@ionic/react';

...

setupIonicReact({
  mode: 'md'
});
```

:::note
開発者は、 `setupIonicReact` カスタム構成を設定していない場合でも、インポートして呼び出す必要があります。
:::

詳しくは [React Config Documentation](../developing/config) をご覧ください。

5.すべてのコントローラのインポートを `@ionic/core` から `@ionic/core/components` に更新します。例として、`menuController` のマイグレーションを紹介します。

**Before**
```tsx
import { menuController } from '@ionic/core';
```

**After**
```tsx
import { menuController } from '@ionic/core/components';
```

### Vue

1. Ionic 6 は Vue 3.0.6+ をサポートしています。Vueの最新バージョンに更新ください。

```shell
npm install vue@3 vue-router@4
```

2. Vue CLIを使用するアプリの場合は、Vue CLI 5をインストールします。

```shell
npm install -g @vue/cli@next
```

次に、すべてのVue CLIプラグインをアップグレードします。

```shell
vue upgrade --next
```

3. Ionic 6の最新バージョンに更新します。

```shell
npm install @ionic/vue@6 @ionic/vue-router@6
```

4. `package.json` の`jest.config.js` か `jest` のどちらかに `transformIgnorePatterns` を含めます。

```js title="jest.config.js"
module.exports = {
  ...
  transformIgnorePatterns: ['/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons)']
}
```

```json title="package.json"
  {
    ...
    "jest": {
      "transformIgnorePatterns": ["/node_modules/(?!@ionic/vue|@ionic/vue-router|@ionic/core|@stencil/core|ionicons)"]
    }
  }
```

詳しくは [Testing section below](#testing) をご覧ください。

5. `@ionic/vue` からエクスポートしていた `setupConfig` 関数を削除してください。そして、設定するときは `IonicVue` を代わりに利用してください。詳しくは [Vue Config Documentation](../developing/config) をご覧ください。

6. `useIonRouter` で利用してる型 `IonRouter` を `UseIonRouterResult` に変更してください。

7. `useKeyboard` で利用してる型 `IonKeyboardRef` を `UseKeyboardResult` に変更してください。

8. すべてのオーバーレイイベントリスナーの名前を変更し、新しいフォーマットを使用するようにします。

**Before**
```html
<ion-modal
  :is-open="modalOpenRef"
  @onWillPresent="onModalWillPresentHandler"
  @onDidPresent="onModalDidPresentHandler"
  @onWillDismiss="onModalWillDismissHandler"
  @onDidDismiss="onModalDidDismissHandler"
>
  ...
</ion-modal>
```

**After**
```html
<ion-modal
  :is-open="modalOpenRef"
  @willPresent="onModalWillPresentHandler"
  @didPresent="onModalDidPresentHandler"
  @willDismiss="onModalWillDismissHandler"
  @didDismiss="onModalDidDismissHandler"
>
  ...
</ion-modal>
```

:::note
これらは `ion-action-sheet`, `ion-alert`, `ion-loading`, `ion-modal`, `ion-picker`, `ion-popover`, `ion-toast` に適用されます。
:::

9.  `ion-router-outlet` を `ion-tabs` の中にいれて利用します。

**Before**
```html
<ion-tabs>
  <ion-tab-bar slot="bottom">
    ...
  </ion-tab-bar>
</ion-tabs>

<script>
  import { IonTabs, IonTabBar } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: { IonTabs, IonTabBar }
  });
</script>
```

**After**
```html
<ion-tabs>
  <ion-router-outlet></ion-router-outlet>
  <ion-tab-bar slot="bottom">
    ...
  </ion-tab-bar>
</ion-tabs>

<script>
  import { IonTabs, IonTabBar, IonRouterOutlet } from '@ionic/vue';
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    components: { IonTabs, IonTabBar, IonRouterOutlet }
  });
</script>
```

10. タブ内の追加ルートは、子ルートではなく兄弟ルートとして書き直す必要があります。

**Before**
```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue'),
        children: {
          {
            path: 'view',
            component: () => import('@/views/Tab1View.vue')
          }
        }
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      }
    ]
  }
]
```

**After**
```ts
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: 'tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'tab1/view',
        component: () => import('@/views/Tab1View.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      }
    ]
  }
]
```

### Core

1. Ionic 6 の最新バージョンにアップデートください。

```shell
npm install @ionic/core@6
```

## コアのアップデート

### Datetime

1. `placeholder`, `pickerOptions`, `pickerFormat`, `monthNames`, `monthShortNames`, `dayNames`, `dayShortNames`プロパティの使用をすべて削除してください。`ion-datetime` は、デバイスに設定されている言語と地域に応じて、コンポーネント内に表示される月名、日名、時刻を自動的にフォーマットするようになりました。詳細は、[ion-datetime Localization Documentation](../api/datetime#localization) を参照してください。

2. `text` と `placeholder` の CSS シャドウパーツの使用をすべて削除します。

3. CSS変数 `--padding-bottom`, `--padding-end`, `--padding-start`, `--padding-top`, `--placeholder-color` のすべての使用を削除します。 `ion-datetime` のパディングをカスタマイズするには、 `padding` CSSプロパティのいずれかを使用することができます。

4. `open` メソッドの使用はすべて削除します。datetime をオーバーレイで表示するには、 `ion-modal` または `ion-popover` コンポーネントの中に配置する。詳細は、[ion-datetime Usage Examples](../api/datetime#usage) を参照してください。

5. `displayFormat` プロパティまたは `displayTimezone` プロパティの使用をすべて削除します。ionChange` イベントのペイロードで提供される UTC 文字列をパースするには、[date-fns](https://date-fns.org/) を使用することをお勧めします。例としては、[ion-datetime Parsing Dates Documentation](../api/datetime#parsing-dates) を参照してください。

:::note
マイグレーション例は [Datetime Migration Sample Application](https://github.com/ionic-team/datetime-migration-samples) をご覧ください。
:::

### Icon

Ionic 6には、Ionicons 6が同梱されるようになりました。[Ionicons 6 Breaking Changes Guide](https://github.com/ionic-team/ionicons/releases/tag/v6.0.0) をご確認の上、必要な変更を行なってください。

### Input

`placeholder` プロパティの値として `null` が渡されていないことを確認してください。代わりに `undefined` を使用することを推奨します。

### Modal

`ion-modal` は Shadow DOM を使用するようになりました。 `ion-modal` の内部をターゲットとするスタイルは、[ion-modal CSS Variables](../api/modal#css-custom-properties) または [ion-modal CSS Shadow Parts](../api/modal#css-shadow-parts) を使用して更新してください。

**Before**
```css
ion-modal .modal-wrapper {
  ...
}

ion-modal ion-backdrop {
  ...
}
```

**After**
```css
ion-modal::part(content) {
  ...
}

ion-modal::part(backdrop) {
  ...
}
```

### Popover

`ion-popover` は Shadow DOM を使用するようになりました。 `ion-popover` の内部をターゲットとするスタイルは、[ion-popover CSS Variables](../api/popover#css-custom-properties) または [ion-popover CSS Shadow Parts](../api/popover#css-shadow-parts) を使用するように更新してください。


**Before**
```css
ion-popover .popover-arrow {
  ...
}

ion-popover ion-backdrop {
  ...
}

ion-popover .popover-content {
  ...
}
```

**After**
```css
ion-popover::part(arrow) {
  ...
}

ion-popover::part(backdrop) {
  ...
}

ion-popover::part(content) {
  ...
}
```

### Radio

`RadioChangeEventDetail` インターフェースのすべての使用法を削除します。

### Select

`placeholder` プロパティの値として `null` が渡されていないことを確認してください。代わりに `undefined` を使用することを推奨します。

### Textarea

`placeholder` プロパティの値として `null` が渡されていないことを確認してください。代わりに `undefined` を使用することを推奨します。

### ブラウザサポート

Ionicがサポートしているブラウザのリストが変更されました。 [ブラウザサポートガイド](../reference/browser-support) を確認し、サポートされているブラウザにアプリをデプロイするようにしましょう。


### テスト

Ionic 6は、ESモジュールとして出荷されるようになりました。ESモジュールは、すべての主要なブラウザでサポートされており、開発者のエクスペリエンスとコードのメンテナンス性を向上させることができます。Jestでテストする開発者は、Jest 27の時点でJestがES Modulesを完全にサポートしていないため、Jestの設定を更新する必要があります。

このアップデートでは、Babelを使用してIonicのESモジュールをJestが理解できるCommonJS (CJS) 形式にコンパイルする必要があります。JestがESモジュールをサポートするようになれば、この変更は必要なくなります。JestのESモジュールサポートに関する最新情報は、https://github.com/facebook/jest/issues/9430 を参照してください。

新しいIonicアプリを新しく始める場合、この設定はスターターアプリケーションで行われます。既存のIonicアプリをお持ちの方は、以下の手順でJestをIonic 6で動作させることができます。

1. Jest の設定に、関連する Ionic パッケージを含む `transformIgnorePatterns` フィールドを追加します。これは通常 `jest.config.js` または `package.json` の `jest` フィールドに含まれています。

```js title="jest.config.js"
module.exports = {
  ...
  transformIgnorePatterns: ['/node_modules/(?!@ionic/core|@stencil/core|ionicons)']
}
```

```json title="package.json"
  {
    ...
    "jest": {
      "transformIgnorePatterns": ["/node_modules/(?!@ionic/core|@stencil/core|ionicons)"]
    }
  }
```

:::note
Ionic ReactまたはIonic Vueを使用している場合、適切なパッケージを `transformIgnorePatterns` 配列に追加してください。Ionic Reactの場合は、 `@ionic/react` と `@ionic/react-router` がこれにあたります。Ionic Vueの場合は、 `@ionic/vue` と `@ionic/vue-router` が含まれます。
:::

Create React App (CRA) を使用している開発者にとっては、現在のところ Jest 設定ファイルの `transformIgnorePatterns` を更新する方法がありません。これはCRAの制限であり、Ionicがコントロールできることではありません。しかし、`react-scripts test` コマンドに直接 `transformIgnorePatterns` を渡すことはできます。

```json title="package.json"
"scripts": {
  "test": "react-scripts test --transformIgnorePatterns 'node_modules/(?!(@ionic/react|@ionic/react-router|@ionic/core|@stencil/core|ionicons)/)'",
  ...
}
```

それでも問題が発生する場合は、以下のことを試してみてください。

1. `@babel/preset-env` が [file-relative configuration](https://babeljs.io/docs/en/config-files#file-relative-configuration) ではなく、 [project-wide configuration](https://babeljs.io/docs/en/config-files#project-wide-configuration) に含まれていることを確認します。これは通常、 `<project-root>/babel.config.json` で Babel 設定を定義することを意味します。

2. `package.json` ファイルに `browserslist/test` フィールドがある場合、それが `current node` に設定されていることを確認してください。

## アップグレートへの助けが必要？

[Ionic 6 Breaking Changes Guide](https://github.com/ionic-team/ionic-framework/blob/main/BREAKING.md) を必ずご覧ください。デフォルトのプロパティとCSS変数の値について、開発者が知っておくべき変更がいくつかありました。このページでは、ユーザーによる操作が必要な変更点のみを掲載しています。 

アップグレードに助けが必要な場合、 [Ionic Forum](https://forum.ionicframework.com/) にスレッドを立ててください。

# capacitor-multi-webview

multi-webview-manager

## Install

To use npm

```bash
npm install capacitor-multi-webview
````

To use yarn

```bash
yarn add capacitor-multi-webview
```

Sync native files

```bash
npx cap sync
```

## API

<docgen-index>

* [`openWebView(...)`](#openwebview)
* [`closeWebView(...)`](#closewebview)
* [`postMessageToWebView(...)`](#postmessagetowebview)
* [`addListener('onSubWebViewMessage', ...)`](#addlisteneronsubwebviewmessage-)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### openWebView(...)

```typescript
openWebView(options: { url: string; webviewId: string; }) => Promise<void>
```

새로운 웹뷰를 띄웁니다.

| Param         | Type                                             |
| ------------- | ------------------------------------------------ |
| **`options`** | <code>{ url: string; webviewId: string; }</code> |

--------------------


### closeWebView(...)

```typescript
closeWebView(options: { webviewId: string; }) => Promise<void>
```

특정 웹뷰를 닫습니다.

| Param         | Type                                |
| ------------- | ----------------------------------- |
| **`options`** | <code>{ webviewId: string; }</code> |

--------------------


### postMessageToWebView(...)

```typescript
postMessageToWebView(options: { webviewId: string; data: any; }) => Promise<void>
```

특정 웹뷰에 메시지를 보냅니다 (부모 -&gt; 자식).

| Param         | Type                                           |
| ------------- | ---------------------------------------------- |
| **`options`** | <code>{ webviewId: string; data: any; }</code> |

--------------------


### addListener('onSubWebViewMessage', ...)

```typescript
addListener(eventName: 'onSubWebViewMessage', listenerFunc: (payload: { webviewId: string; data: any; }) => void) => Promise<PluginListenerHandle>
```

서브 웹뷰로부터 오는 메시지를 수신합니다 (자식 -&gt; 부모).

| Param              | Type                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| **`eventName`**    | <code>'onSubWebViewMessage'</code>                                   |
| **`listenerFunc`** | <code>(payload: { webviewId: string; data: any; }) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### Interfaces


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |

</docgen-api>

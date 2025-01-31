# react-native-openai-jsx
⚛️ 🧪 🤖 Use OpenAI to generate functioning [__React Native__](https://reactnative.dev) components! [__See it in action! 🎬__](https://twitter.com/cawfree/status/1603234088776867840)

It is possible to use [`react-native-openai-jsx`](https://github.com/cawfree/react-native-openai-jsx) to create real, working React Native applications just by providing some high-level descriptions about what you'd like to see.

For example:

```typescript
import { Alert } from 'react-native';
import { Prompt } from 'react-native-openai-jsx';

export default function App(): JSX.Element {
  return (
    <Prompt
      extraProps={React.useMemo(() => ({
        onPress: (message: string) => Alert.alert(message),
      }), [])}
      prompt={[
        'Provide a complete example of a React Native View component which contains a big Button in the center with the text "Press Me".',
        'When the Button is pressed, it must call a function prop passed into the component called onPress with the parameter \"Hello from OpenAI!\".',
      ].join(' ')}
    />
  );
}
```

It might seem totally crazy, but this actually _works_! By using the [`openai`](https://github.com/openai/openai-node) client library, we can use their sophisticated [__Machine Learning Model__](https://openai.com/blog/chatgpt/) to imagine functional React Native applications for us. At runtime, we can use [`@babel/runtime`](https://github.com/babel/babel/tree/master/packages/babel-runtime) to transpile the auto-generated module into runtime-friendly JavaScript and have this execute on top of a [`react-native-wormhole`](https://github.com/cawfree/react-native-wormhole).

### 🚀 Getting Started

First, you'll need to install `react-native-openai-jsx` and `react-native-url-polyfill`:

```shell
yarn add react-native-openai-jsx react-native-url-polyfill
```

Whilst this is downloading, you'll need to create a client API key for OpenAI if you don't already have one. You can find instructions on how to do this [__here__](https://beta.openai.com/account/api-keys).

> Note: You'll need `react-native-url-polyfill` to enable compatibility with the official [`openai` __SDK__](https://github.com/openai/openai-node).


Next, at the root of your application [__import the polyfills__]() to the entry point of your application, i.e.:

```diff
+ import 'react-native-url-polyfill/auto';

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

That should be everything!

To see this all come together, you are free to try out the [`example`](./example) app:

```
cd example/
OPENAI_API_KEY="<your-api-key>" yarn (ios|android|web)
```

### 🦄 Configuration

The `<Prompt />` component exposes all of the interface capabilities to start creating and customizing your own language model [__prompts__](https://en.wikipedia.org/wiki/Prompt_engineering).

| Name                 | Type                    | Description                                                                                                                                                                                                        | Default Value                                                    |
|----------------------|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------|
| `prompt`             | `string?`               | The text string used to suggest to the machine learning model what application to create.                                                                                                                          | A condition designed to evaluate into an empty `React.Fragment`. |
| `completionSettings` | `CompletionSettings`    | A [`CreateCompletionRequest`](https://github.com/openai/openai-node/blob/108b63c7bbcbdf3a817d47702bef57b1a0d717da/dist/api.d.ts#L362) object.                                                                      | __Required__                                                     |
| `style`              | `StyleProp<ViewStyle>?` |                                                                                                                                                                                                                    | `undefined`                                                      |
| `debug`              | `boolean?`              | Used to render errors during transpilation and preview the responses generated by OpenGPT.                                                                                                                         | `false`                                                          |
| `extraProps`         | `<T>`                   | A custom object you can use to pass into OpenGPT. For example, you can pass a callback function and instruct the machine learning model that it exists as a possible prop.                                         | `{}`                                                             |
| `Wormhole`           | `React.FC`              | A [`Wormhole`](https://github.com/cawfree/react-native-wormhole). This can be used to include support for additional libraries such as [`react-native-svg`](https://github.com/software-mansion/react-native-svg). | `DefaultWormhole`                                                |

Please do not forget, in order to have __any__ success with this library whatsoever you __must__ inform the machine learning model that you are trying to create a React Native application as part of your prompt.

### ✌️ License
[__MIT__](./LICENSE)

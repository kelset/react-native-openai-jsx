import * as React from "react";
import { StyleSheet, TextInput, View, Button } from "react-native";

import { Prompt } from "../../prompt";

const defaultPrompt = [
  "A professional screen that uses a gothic color palette, but that still complies with accessibility standards for contrast.",
  'A title which says "Using OpenAI in React Native"',
  "A medium-length description about how OpenAI can be used to create dynamic React Native layouts.",
];

// create a component called InputArea with a textinput and a button to set a prompt
function InputArea(setPrompt: (text: string) => void) {
  // create a textinput component that will affect the prompt state text
  const [text, setText] = React.useState("");
  const onChangeText = React.useCallback((t: string) => {
    setText(t);
  }, []);

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        placeholder={""}
      />

      <Button
        title="Submit"
        onPress={() => {
          setPrompt(text);
        }}
      />
    </View>
  );
}

export const Home = React.memo(function Home(): JSX.Element {
  const onPressUsingSVGs = React.useCallback(() => {
    console.warn("hihihih");
  }, []);

  const [textPrompt, setTextPrompt] = React.useState("");

  const setPrompt = (text: string) => {
    setTextPrompt(text);
  };

  const finalPrompt = textPrompt.length > 5 ? [textPrompt] : defaultPrompt;

  console.log("hello", finalPrompt);

  return (
    <>
      <InputArea setPrompt={setPrompt} />
      <Prompt
        key={Math.random()}
        style={styles.promptArea}
        extraProps={React.useMemo(
          () => ({
            onPressUsingSVGs,
          }),
          [onPressUsingSVGs]
        )}
        prompt={finalPrompt}
      />
    </>
  );
});

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
  promptArea: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

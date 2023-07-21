import { View, Text, Pressable  , Image} from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();
const App = () => {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "500032344070-lv5nq7m3m69a1u122qoe0o3m2vc65m4j.apps.googleusercontent.com",
    androidClientId:
      "500032344070-eqi906fp0iincc81plts7j8bi188uco2.apps.googleusercontent.com",
    webClientId:
      "500032344070-lv5nq7m3m69a1u122qoe0o3m2vc65m4j.apps.googleusercontent.com",
  });
  const [user, setUser] = React.useState(null);
  const [authToken, setAuthToken] = React.useState(null);
  React.useEffect(() => {
    if (response?.type === "success") {
      setAuthToken(response?.authentication?.accessToken);
      authToken && fetchUserInfo();
    }
  }, [response, authToken]);

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    let userInfo = await response.json();
    setUser(userInfo);
  }
  console.log(user);
if (user) {
 return <View style={{
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 10
 }}>
    <Text>{user?.name}</Text>
    <Text>{user?.email}</Text>
    {/* <Text>{user.picture}</Text> */}
    <Image source={{uri: user?.picture}} style={{width: 100, height: 100 , margin:10}} />
  </View>
}
  return (
    <View
      style={{
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}
    >
      <Pressable onPress={() => promptAsync()}>
        <Text>Login with Google</Text>
      </Pressable>
    </View>
  );
};

export default App;

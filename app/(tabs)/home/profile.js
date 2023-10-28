import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  Button,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import {
  Ionicons,
  Entypo,
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

const profile = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const router = useRouter();
  const [userDescription, setUserDescription] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  useEffect(() => {
    if (userId) {
      fetchUserProfile();
    }
  }, [userId]);
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/profile/${userId}`
      );
      const userData = response.data.user;
      setUser(userData);
    } catch (error) {
      console.log("error fetching user profile", error);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const handleSaveDescription = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/profile/${userId}`,
        {
          userDescription,
        }
      );

      if (response.status === 200) {
        await fetchUserProfile();

        setIsEditing(false);
      }
    } catch (error) {
      console.log("Error saving user description", error);
    }
  };
  const logout = () => {
    clearAuthToken();
  };
  const clearAuthToken = async () => {
    await AsyncStorage.removeItem("authToken");
    console.log("auth token cleared");
    router.replace("/(authenticate)/login");
  };
  return (
    <View>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Pressable>
          <Image
            style={{ width: 30, height: 30, borderRadius: 15 }}
            source={{ uri: user?.profileImage }}
          />
        </Pressable>

        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 7,
            gap: 10,
            backgroundColor: "white",
            borderRadius: 3,
            height: 30,
            flex: 1,
          }}
        >
          <AntDesign
            style={{ marginLeft: 10 }}
            name="search1"
            size={20}
            color="black"
          />
          <TextInput placeholder="Search" />
        </Pressable>

        <Ionicons name="chatbox-ellipses-outline" size={24} color="black" />
      </View>

      <Image
        style={{ width: "100%", height: 130 }}
        source={{
          uri: "https://media.istockphoto.com/id/937025430/photo/abstract-defocused-blue-soft-background.jpg?b=1&s=612x612&w=0&k=20&c=FwJnRNxkX_lZKImOoJbo5VsgZPCMNiODdsRsggJqejA=",
        }}
      />

      <View style={{ position: "absolute", top: 130, left: 10 }}>
        <Image
          style={{ width: 120, height: 120, borderRadius: 60 }}
          source={{ uri: user?.profileImage }}
        />
      </View>

      <View style={{ marginTop: 80, marginHorizontal: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>{user?.name}</Text>
        <Pressable onPress={() => setIsEditing(!isEditing)}>
          <Text>{user?.userDescription ? "Edit" : "Add Bio"}</Text>
        </Pressable>

        <View>
          {isEditing ? (
            <>
              <TextInput
                placeholder="enter your description"
                value={userDescription}
                onChangeText={(text) => setUserDescription(text)}
              />

              <Button onPress={handleSaveDescription} title="Save" />
            </>
          ) : (
            <Text>{user?.userDescription}</Text>
          )}
        </View>

        <Text style={{ marginTop: 12, fontWeight: "500", fontSize: 15 }}>
          Youtube • Linkedin Member
        </Text>
        <Text style={{ fontSize: 15, color: "gray" }}>
          Bengaluru, Karnataka, India
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          marginTop: 12,
          marginHorizontal: 10,
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#0072b1",
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Open to</Text>
        </Pressable>
        <Pressable
          style={{
            backgroundColor: "#0072b1",
            paddingVertical: 4,
            paddingHorizontal: 10,
            borderRadius: 25,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Add Section
          </Text>
        </Pressable>
      </View>

      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Analytics</Text>
        <Text style={{ fontSize: 15, color: "gray", marginTop: 2 }}>
          Private to you
        </Text>

        <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
          <Ionicons name="people" size={28} color="black" />
          <View style={{ marginLeft: 7 }}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              350 profile views
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "gray",
                marginTop: 1,
              }}
            >
              Discover who's viewed your profile
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
          <Entypo name="bar-graph" size={24} color="black" />
          <View style={{ marginLeft: 7 }}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              1242 post Impressions
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "gray",
                marginTop: 1,
              }}
            >
              Checkout who's engaing with your posts
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 7, marginTop: 10 }}>
          <Feather name="search" size={24} color="black" />
          <View style={{ marginLeft: 7 }}>
            <Text style={{ fontSize: 15, fontWeight: "600" }}>
              45 post appearenced
            </Text>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "gray",
                marginTop: 1,
              }}
            >
              see how often you appear in search results
            </Text>
          </View>
        </View>
      </View>

      <Pressable onPress={logout}>
        <Text>Logout</Text>
      </Pressable>
    </View>
  );
};

export default profile;

const styles = StyleSheet.create({});

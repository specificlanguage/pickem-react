import { getAuth } from "firebase/auth";
import axios from "axios";

interface User {
  username: string;
  uid: string;
  email?: string;
  imageURL?: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

/**
 * Get a user by their uid, provided by firebase.
 * @param uid - The UID that's provided from Firebase for the user. You're responsible for providing this.
 * @returns The user object if found, or null if not found.
 */
export function getUser(uid: string): Promise<User | null> {
  return axios
    .get(BACKEND_URL + `/users?id=${uid}`)
    .then((res) => {
      if (res.status === 404) return null;
      else return res.data as User;
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

/**
 * Get a user by their username. Mostly used for checking when initially signing up for the app.
 * @param username - The username to search for.
 * @returns The user object if found, or null if not found.
 */
export function getUserByUsername(username: string): Promise<User | null> {
  return axios
    .get(BACKEND_URL + `/users?username=${username}`)
    .then((res) => {
      if (res.status === 404) return null;
      else return res.data as User;
    })
    .catch(() => {
      return null;
    });
}

/**
 * Create a user in the database. This is used when a user signs up for the app.
 * @param user - The user object to create in the database.
 * @returns (optionally) the user object that was created, or null if there was an error.
 */
export async function createUser(user: User) {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (currentUser === null) throw new Error("User is not logged in");
  else {
    return axios.post(BACKEND_URL + "/users", user, {
      headers: {
        Authorization: await currentUser.getIdToken(),
        "Content-Type": "application/json",
      },
    });
  }
}

/**
 * Deletes the current user logging in. WARNING: this should not be used anywhere except in tests.
 */
export async function deleteUser() {
  const auth = getAuth();
  const currentUser = auth.currentUser;
  if (currentUser === null) throw new Error("User is not logged in");
  return axios.delete(BACKEND_URL + "/users", {
    headers: {
      Authorization: await currentUser.getIdToken(),
    },
  });
}

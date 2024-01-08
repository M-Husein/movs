import { AuthBindings } from "@refinedev/core";
import { db } from '@/utils/db';

const TOKEN_KEY = "user";

const clearLocalData = () => {
  localStorage.removeItem(TOKEN_KEY);
}

export const authProvider: AuthBindings = {
  register: async ({ email, name, password, providerName, redirectPath }) => {
    const checkAvailable = await db.users
      .where('email')
      .equals(email)
      .limit(1)
      .toArray();

    if(checkAvailable?.length){
      return {
        success: false,
        error: {
          name: "RegisterError",
          message: "Email already used",
        },
      };
    }

    const save = await db.users.add({
      email,
      name,
      password,
      providerName,
    });

    if(save){
      return {
        success: true,
        redirectTo: redirectPath,
      };
    }

    return {
      success: false,
      error: {
        name: "RegisterError",
        message: "Failed register",
      },
    };
  },
  login: async ({ username, email, password, providerName /** @DEV_OPTIONS : , remember */ }) => {
    const errorResponse = {
      success: false,
      error: {
        name: "LoginError",
        message: "Invalid username or password",
      },
    };

    const identity = username || email;

    if(identity && password){
      try {
        const req = await db.users
          .where('email').equals(identity)
          .and((user: any) => user.password === password)
          .limit(1).toArray();

        if(req?.length){
          const { password: pwd, ...etc } = req[0];
          localStorage.setItem(TOKEN_KEY, JSON.stringify(etc));
        }else{
          return {
            ...errorResponse,
            error: {
              ...errorResponse.error,
              message: "We apologize that an error occurred. Please try again."
            }
          };
        }
      }catch(e){
        return errorResponse;
      }

      return {
        success: true,
        redirectTo: "/",
      };
    }

    return errorResponse;
  },
  logout: async () => {
    clearLocalData();

    return {
      success: true,
      redirectTo: "/login",
    };
  },
  check: async () => {
    const errorResponse = {
      authenticated: false,
      logout: true,
      redirectTo: "/login",
      error: {
        message: "Check failed",
        name: "Unauthorized",
      },
    };

    const user = localStorage.getItem(TOKEN_KEY);

    if(user){
      try {
        // @ts-ignore
        const req = await db.users
          .where('email')
          .equals(JSON.parse(user).email)
          .limit(1)
          .toArray();
  
        if(req?.length){
          return { authenticated: true }
        }

        // Clear data
        clearLocalData();
  
        return errorResponse;
      } catch(e){
        return errorResponse;
      }
    }

    return errorResponse;
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = localStorage.getItem(TOKEN_KEY);

    if (user) {
      return JSON.parse(user);
    }

    return null;
  },
  forgotPassword: async () => {
    const errorResponse = {
      success: false,
      error: {
        name: "Forgot Password Failed",
        message: "Username does not exist",
      },
    };

    return errorResponse;
  },
  onError: async (error) => {
    // Request abort / cancel
    // if (error.name === 'AbortError' || error.message === 'canceled') {
    //   return  {};
    // }

    if (error?.response?.status === 401) {
      return {
        error,
        authenticated: false,
        logout: true,
        redirectTo: "/login",
      }
    }

    return { error };
  },
};

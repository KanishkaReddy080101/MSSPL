
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            type: "credentials",
            async authorize(credentials, req) {

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                };

                const response = await fetch(
                  `${process.env.NEXT_PUBLIC_LOGIN_API_ENDPOINT}?UserID=${credentials.username}&Password=${credentials.password}`,
                    requestOptions
                );

                if (response.ok) {
                  const data = await response.json();
                  console.log(data)
                  if (data.length > 0) {
                    const user = data.find((user) => user.UserID === credentials.username && user.Password === credentials.password);
                    if (user) {
                      setUser(user);
                      const branch = user.Branch[0];
                      router.push("/production-home");
                    } else {
                      alert("User not found");
                    }
                  } else {
                    alert("Login failed");
                  }
                } else {
                  console.error(`An error occurred while logging in: ${await response.text()}`);
                  alert("An error occurred while logging in.");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ user, account, token, trigger, session }) {
            if (user) {
                token.user = user;
            }

            if (trigger === "update") {
                token.user = session.user;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.user = token.user; 
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};

export default NextAuth(authOptions);
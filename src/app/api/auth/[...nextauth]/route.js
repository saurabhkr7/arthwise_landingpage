import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import axios from 'axios';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/login`, {
            email: credentials?.username, // UI currently sends 'username' field for email
            password: credentials?.password,
          });

          if (res.data && res.data.status === 'success') {
            const user = res.data.data;
            return {
              id: user._id || user.id,
              name: user.displayname,
              email: user.email,
              image: user.profilePicture,
              accessToken: res.data.accessToken,
              refreshToken: res.data.refreshToken,
            };
          }
          return null;
        } catch (error) {
          console.error("Auth error:", error.response?.data || error.message);
          throw new Error(error.response?.data?.message || "Authentication failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        session.user.id = token.id;
      }
      return session;
    },
  },
});
export { handler as GET, handler as POST };

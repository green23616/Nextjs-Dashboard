import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import KakaoProvider from 'next-auth/providers/kakao';
import NaverProvider from 'next-auth/providers/naver';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import db from '@/db';
import { RowDataPacket } from "mysql2";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

interface User{
  id: string;
  name: string;
  email: string;
  level: string;
}
interface CustomSession extends Session{
  user?: User
}

export const authOptions :any = {
  providers :[
    GithubProvider({
      clientId: `${process.env.GITHUB_ID}`,
      clientSecret: `${process.env.GITHUB_PW}`,
    }),
    KakaoProvider({
      clientId: `${process.env.KAKAO_ID}`,
      clientSecret: `${process.env.KAKAO_PW}`
    }),
    NaverProvider({
      clientId: `${process.env.NAVER_ID}`,
      clientSecret: `${process.env.NAVER_PW}`
    }),
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_PW}`
    }),
    CredentialsProvider({
      name: "Credentaials",
      credentials: {
        email: {label: "email", type: "text"},
        password: {label: "password", type: "password"}
      },
      // 로그인 요청 시 실행되는 코드 db와 비교 이후 맞으면 return user정보를 보내고 틀리면 return null
      async authorize(credentials) :Promise<User | null>{
        try{
          const [results] = await db.query<RowDataPacket[]>('select * from jaewan.member where email = ?',[credentials?.email]);
          console.log(results[0].email)
          const userResult = results[0];
          if(!credentials || !credentials.email || !credentials.password){
            return null
          }
          if(!userResult.email || !userResult.password){
            return null
          }
          const pwChk = await bcrypt.compare(credentials.password, results[0]?.password);
          console.log(pwChk)
          if(!pwChk){
            console.log("비밀번호 에러")
            return null
          }
          const user :User = {
            id: userResult.id,
            name: userResult.name,
            email: userResult.email,
            level: userResult.level
          }
          return user;
        }catch(err){
          return null
        }
      }
    })
  ],
  // jwt 만료일 설정
  session : {
    strategy : 'jwt',
    maxAge : 24 * 60 * 60 * 30
  },
  callbacks: {
    jwt: async ({token, user} : {token: JWT, user?:User}) =>{
      if(user){
        token.user = {
          name : user.name,
          email : user.email,
          level : user.level
        };
      }
      return token
    },
    // user session이 조회될 때마다 실행되는 코드
    session : async({session, token} : {session :CustomSession, token :JWT})=>{
      session.user = token.user as User;
      return session
    }
  },
  secret: `${process.env.SECRET}`,
  // jwt생성 시 필요한 암호
  // pages: {
  //   signIn: '/login'
  // }
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }
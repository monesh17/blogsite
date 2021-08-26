import { withIronSession } from "next-iron-session";

async function handler(req, res, session) {
    const user = await req.session.get("user");
    console.log('user details from server is', user);
    res.send({ user });
}

export default withIronSession(handler, {
    password: process.env.APPLICATION_SECRET,
    cookieName: "blog_user",
    // if your localhost is served on http:// then disable the secure flag
    /* cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    }, */
});
import { withIronSession } from "next-iron-session";

async function handler(req, res) {
    const data = req.body;
    // get user from database then:
    req.session.set("user", {
        //TODO: we need to call blog micro service for authentication
        userName: data.userName,
        password: data.password,
        admin: true,
    });
    await req.session.save();
    res.send("Logged in");
}

export default withIronSession(handler, {
    password: process.env.APPLICATION_SECRET,
    cookieName: "blog_user",
    // if your localhost is served on http:// then disable the secure flag
   /*  cookieOptions: {
        secure: process.env.NODE_ENV === "production",
    }, */
});
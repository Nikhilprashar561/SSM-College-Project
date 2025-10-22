import express from "express"
import cookieParser from "cookie-parser"

import studentRouter from "./routes/student.routee.js"
import teacherRouter from "./routes/teacher.routee.js"
import hodRouter from "./routes/hod.routee.js"
import principalRouter from "./routes/principal.routee.js"
import developerRouter from "./routes/developer.routee.js"
import utilsRouter from "./routes/utils.routee.js"
import coreRouter from "./routes/core.routee.js"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/student", studentRouter)
app.use("/api/teacher", teacherRouter)
app.use("/api/hod", hodRouter)
app.use("/api/principal",  principalRouter)
app.use("/api/developer", developerRouter)
app.use("/api/utils", utilsRouter)
app.use("/api/core", coreRouter)

export { app }
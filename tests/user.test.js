import request from "supertest"
import expect from "expect"

// app
import app from "../server"
// model
import User from "../models/user"
// seed
import { users, populateUserData } from "./seed"

// pre hook
beforeEach(populateUserData)

// test
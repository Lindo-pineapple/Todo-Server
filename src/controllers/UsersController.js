import pkg from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import { HTTP_CODES, DEFAULT_ERROR_MESSAGE } from "../globals.js";
import User from "../models/UserModel.js";

const AuthSecret = process.env.AUTH_SECRET;

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user || !compareSync(password, user.password)) {
    return res.status(401).send("Invalid username or password.");
  }
  const token = pkg.sign({ id: user._id }, AuthSecret, { expiresIn: "30m" });
  res.status(HTTP_CODES.OK).send({ response: user, token: token });
  req.session.token = token;
}

export async function register(req, res) {
  const hashedPassword = hashSync(req.body.password, 10);
  const user = new User({
    username: req.body.username,
    password: hashedPassword,
    email: req.body.email,
  });
  const checkExists = await User.findOne({email: req.body.email});

  if (checkExists) {
    return res.send({data: 'User already Exists.'})
  }

  try {
    const dataToSave = await user.save();
    const token = pkg.sign({ id: user._id }, AuthSecret, { expiresIn: "60m" });
    res.status(HTTP_CODES.CREATED).send({ response: dataToSave, token: token });
    req.session.token = token;
  } catch (err) {
    res
      .status(HTTP_CODES.SERVER_ERROR)
      .json({ message: DEFAULT_ERROR_MESSAGE });
  }
}

export async function getCurrentUser(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      res.status(HTTP_CODES.OK).json(user);
    } else {
      res.status(HTTP_CODES.NOT_FOUND).json({ message: "No User Logged In" });
    }
  } catch (err) {
    res
      .status(HTTP_CODES.SERVER_ERROR)
      .json({ message: DEFAULT_ERROR_MESSAGE });
  }
}

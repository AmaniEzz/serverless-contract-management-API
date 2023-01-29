import { expect } from "chai";
import { User } from "../src/model/user-model";

const MockData: Partial<User> = {
  username: "testUser",
  email: "TestUser@gmail.com",
  password: "kjaksjasda",
};

describe("UserModel", async () => {
  describe("hashpassword and comparePassword", async () => {
    it("hashed password should match plain password", async () => {
      const instance = Object.assign(new User(), MockData);
      await instance.hashPassword();
      const passwordMatch = await instance.comparePassword(
        MockData.password as string
      );
      console.log(passwordMatch);
      expect(passwordMatch).to.be.true;
    });
  });
});

import { expect } from "chai";
import { User } from "../../src/model/user-model";

const MockData: Partial<User> = {
  username: "testUser",
  email: "TestUser@gmail.com",
  password: "kjaksjasda",
};

describe("UserModel", async () => {
  describe("After hashing user's passowrd, compare it with the plain passsword", async () => {
    it("should return true", async () => {
      const instance = Object.assign(new User(), MockData);
      await instance.hashPassword();
      const passwordMatch = await instance.comparePassword(
        MockData.password as string
      );
      console.log(passwordMatch);
      expect(passwordMatch).to.be.true;
    });
  });

  describe("Make email Lowercase", async () => {
    it("email should be lowercase", async () => {
      const instance = Object.assign(new User(), MockData);
      const lowercase = instance.email.toLowerCase();
      instance.setEmail();

      expect(instance.email).to.equal(lowercase);
    });
  });
});

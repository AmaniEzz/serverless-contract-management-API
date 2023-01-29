import {
  attribute,
  table,
  hashKey,
} from "@aws/dynamodb-data-mapper-annotations";
import { v4 } from "uuid";
import * as bcrypt from "bcrypt-ts";

@table("user_table")
export class User {
  @attribute({ defaultProvider: () => v4() })
  id: string;

  @attribute({ type: "String" })
  username: string;

  @hashKey({ type: "String" })
  email: string;

  @attribute({ type: "String" })
  password: string;

  @attribute({
    type: "Date",
    defaultProvider: () => new Date(),
  })
  createdAt?: Date;

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async comparePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }

  setEmail() {
    this.email = this.email.trim().toLowerCase();
  }
}

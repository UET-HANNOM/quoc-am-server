import { HttpException } from "@core/exceptions";
import { ProfileSchema } from ".";

class ProfileService {
  private profileSchema = ProfileSchema;
  public async getCurrentProfile(userId: string) {
    const user = await this.profileSchema
      .findOne({
        user: userId,
      })
      .populate("user", ["name", "avatar"])
      .exec();
    if (!user) {
      throw new HttpException(400, "There is no profile for this user!");
    } else {
      return user;
    }
  }
//   public async createProfile(userId: string, profileDto: createProfileDto) {}
}

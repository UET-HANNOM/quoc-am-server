import { UserSchema } from "@modules/users";
import { HttpException } from "@core/exceptions";
import { ProfileSchema } from ".";
import IProfile, { ISocial } from "./interface";
import normalize from "normalize-url";
import { IUser } from "@modules/auth";
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
  public async createProfile(userId: string, profileDto: any) {
    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      zalo,
    } = profileDto;
    const profileFields: Partial<IProfile> = {
      user: userId,
      company,
      location,
      website:
        website && website != ""
          ? normalize(website.toString(), { forceHttps: true })
          : "",
      bio,
      skills: Array.isArray(skills)
        ? skills
        : skills.split(",").map((skill: string) => skill.trim()),
      status,
    };

    const socialFields: ISocial = {
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
      zalo,
    };
    for (const [key, value] of Object.entries(socialFields)) {
      if (value && value.length > 0) {
        socialFields[key] = normalize(value, { forceHttps: true });
      }
    }
    profileFields.social = socialFields;

    const profile = await this.profileSchema
      .findOneAndUpdate(
        { user: userId },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      )
      .exec();

    return profile;
  }

  public async deleteProfile(userId: string) {
    await this.profileSchema.findByIdAndRemove({ user: userId }).exec();
    await UserSchema.findOneAndRemove({ _id: userId }).exec();
  }
  public async getAllProfile(): Promise<Partial<IUser>[]> {
    const profile = await this.profileSchema
      .find()
      .populate("user", ["name", "avatar"])
      .exec();
    return profile;
  }
}

export default ProfileService;

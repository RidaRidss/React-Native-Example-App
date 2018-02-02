import { Platform, Share } from "react-native";

class CommonUtils {
  getProfileImage(user) {
    if (user) {
      let userImage;

      const galleryImage =
        user && user.gallery && user.gallery.length > 0
          ? user.gallery[0].file
          : undefined;
      let socialImage =
        user && user.attributes && user.attributes.social_image
          ? user.attributes.social_image
          : undefined;

      if (socialImage === undefined) {
        socialImage = user && user.social_image ? user.social_image : undefined;
      }

      userImage = galleryImage != undefined ? galleryImage : socialImage;

      if (
        (!userImage || userImage == undefined || userImage.length === 0) &&
        user.profile_image
      ) {
        userImage = user.profile_image;
      }

      return userImage && userImage.length > 0
        ? userImage
        : "https://www.communitylandtrust.ca/wp-content/uploads/2015/10/placeholder.png";
    }

    return "";
  }

  getUserName(user) {
    const auth = user && user.auth ? user.auth : undefined;
    const attributes = user && user.attributes ? user.attributes : undefined;
    let username;

    if (auth && auth.name) {
      username = auth.name;
    } else if (attributes && attributes.name) {
      username = attributes.name;
    } else if (user && user.name) {
      username = user.name;
    } else if (user && user.username) {
      username = user.username;
    }

    return username;
  }
}

export default new CommonUtils();

// @flow
// Facebook Settings
export const FACEBOOK_APP_ID = "";
export const FACEBOOK_PERMISSIONS = ["email", "public_profile"];
export const PROFILE_REQUEST_PARAMS = {
  fields: {
    string:
      "id, name, email, first_name, last_name, gender, verified, picture.type(large), birthday, hometown"
  }
};

export const googleProfileRequestConfig = {
  // iOS
  clientID:
    "1097089210428-o6cmiib540tnstm3jbsktp6qno6e8v3g.apps.googleusercontent.com",

  // iOS, Android
  // https://developers.google.com/identity/protocols/googlescopes
  scopes: ["openid", "email", "profile"],

  // iOS, Android
  // Whether to request email and basic profile.
  // [Default: true]
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a06bf16b507496b126d25ea909d366ba4
  shouldFetchBasicProfile: true,

  // iOS
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a486c8df263ca799bea18ebe5430dbdf7
  // language: string,

  // iOS
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd
  // loginHint: string,

  // iOS, Android
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#ae214ed831bb93a06d8d9c3692d5b35f9
  // serverClientID: "yourServerClientID",

  // Android
  // Whether to request server auth code. Make sure to provide `serverClientID`.
  // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
  offlineAccess: false,

  // Android
  // Whether to force code for refresh token.
  // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#requestServerAuthCode(java.lang.String, boolean)
  forceCodeForRefreshToken: false

  // iOS
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a211c074872cd542eda53f696c5eef871
  // openIDRealm: string,

  // Android
  // https://developers.google.com/android/reference/com/google/android/gms/auth/api/signin/GoogleSignInOptions.Builder.html#setAccountName(java.lang.String)
  // accountName: "yourServerAccountName",

  // iOS, Android
  // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a6d85d14588e8bf21a4fcf63e869e3be3
  // hostedDomain: "yourHostedDomain"
};

export function profileRequestConfig(accessToken) {
  return {
    accessToken,
    parameters: PROFILE_REQUEST_PARAMS
  };
}

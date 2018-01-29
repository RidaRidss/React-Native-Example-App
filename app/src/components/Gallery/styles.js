// @flow
import { StyleSheet } from "react-native";
import { Metrics ,Fonts} from "../../theme";

export default StyleSheet.create({
  container: {
    height:Metrics.image.xxLarge
    // width: Metrics.screenWidth,
    // height: Metrics.screenWidth / 2
  },
  accessory: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    position: "absolute"
  },
  cover: {
    width: Metrics.screenWidth,
    height: Metrics.screenWidth / 2,
    alignItems: "center",
    justifyContent: "center"
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin
    
  },
  event_privacy:{flexDirection:"row",justifyContent:"flex-end",position:"absolute",bottom:Metrics.baseMargin*2,width:Metrics.screenWidth},
  privacy_text:{color:"#fff",fontFamily:Fonts.type.medium,fontSize:Fonts.size.small,marginRight:Metrics.baseMargin},
  category_text:{color:"#fff",fontFamily:Fonts.type.medium,fontSize:Fonts.size.small,marginTop:Metrics.smallMargin,marginLeft:Metrics.smallMargin},
  event_title:{color:"#fff",fontFamily:Fonts.type.medium,fontSize:Fonts.size.large},
  text_area:{position:"absolute",bottom:Metrics.baseMargin,marginLeft:Metrics.smallMargin/1.2,marginBottom:Metrics.baseMargin}
});

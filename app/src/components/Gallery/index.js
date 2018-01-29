// @flow
import React from "react";
import PropTypes from "prop-types";
import { View, Platform, Image, Text } from "react-native";
import Swiper from "react-native-swiper";

import Lightbox from "react-native-lightbox";
import ImageLoad from "react-native-image-placeholder";

import styles from "./styles";
import { Images , Metrics, Fonts, Colors} from "../../theme";
import { Rating } from "../../components"

export default class Gallery extends React.PureComponent {
  static propTypes = {
    loop: PropTypes.bool,
    gallery: PropTypes.array,
    renderAccessory: PropTypes.func,
    title:PropTypes.string,
    category:PropTypes.string,
    rating:PropTypes.number,      
    private_event:PropTypes.bool,
    dotColor: PropTypes.string,
    activeDotColor: PropTypes.string,
    placeholder: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
  };

  static defaultProps = {
    loop: false,
    gallery: [],
    title:PropTypes.string,
    category:PropTypes.string,  
    private_event:PropTypes.bool,    
    rating:PropTypes.number,  
    dotColor: "gray",
    activeDotColor: "white",
    renderAccessory: () => <View />,
    placeholder: Images.cover
  };

  _renderGallery(gallery,title,category,rating,private_event) {
    const { ...rest } = this.props;
    return (
      <View>
      <Swiper {...rest} style={styles.container}>
        {gallery.map((_gallery, index) =>
          this._renderImage({ uri: _gallery.file}, index, title,category,rating,private_event)
        )}
        
      </Swiper>
<View style={styles.text_area}>

<Text style={styles.event_title}> {title}</Text>
<View style={styles.ratingContainer}>
<Rating
  starSize={20}
  rating={Math.floor(rating)}
  // disabled
  starStyle={{ marginRight: 4 }}
/>
</View>
<Text size="large" style={styles.category_text}> {category}</Text>



</View>
{(private_event)? (
  <View style={styles.event_privacy}>
  <Text style={styles.privacy_text}>Private</Text>
  </View>
  ):(<View style={styles.event_privacy}><Text style={styles.privacy_text}>Public</Text></View>)}
    </View>    
    );
  }

  _renderImage(source, key: string = "image") {
    return (
    
  //    <View>
      <Lightbox
      springConfig={{tension: 15, friction: 7}} swipeToDismiss={false}
        activeProps={{
          // style: {
          //   flex: 1,
          //   resizeMode: "contain",
          //   alignItems: "center",
          //   justifyContent: "center",
          //   height: Metrics.halfScreenHeight,
          //   width:null
          // }
          style: {
            // top: 0,
            // left: 0,
            // right: 0,
            // bottom: 0,
            width: null,
            height: Metrics.screenWidth / 2,
            justifyContent: "center",
            flex: 1,
            alignItems: "center"
          }
        }}
      >
      <Image
      // resizeMode="cover"
      source={source}
      style={styles.cover}
      defaultSource={Images.cover}
      key={key}
      />
      
      </Lightbox>



//      </View>
      // <Image
      // resizeMode="cover"
      // source={source}
      // isShowActivity={false}
      // style={styles.cover}
      // placeholderSource={Images.cover}
      // placeholderStyle={styles.cover}
      // key={key}
      // />
      );
    }
    
    // {Platform.OS === "ios" ? (
      // <Image
      // // resizeMode="cover"
      // source={source}
      // style={styles.cover}
      // defaultSource={Images.cover}
      // key={key}
      // />
        // ) : (
        // )}
        render2(gallery: any, placeholder: any,title,category,rating,private_event) {
          if (gallery.length === 0 && gallery[0] && gallery[0].file) {
            return this._renderImage({ uri: gallery[0].file ,title,category,rating,private_event});
          }
          
          if (gallery.length > 1) {
            return this._renderGallery(gallery,title,category,rating,private_event);
          }
          
          return this._renderImage(placeholder,title,category,rating,private_event);
        }
        
        render() {
    const { gallery, placeholder, renderAccessory ,title,category,rating,private_event} = this.props;

    return (
      <View>
        {this.render2(gallery, placeholder,title,category,rating,private_event)}
        </View>
        // <View style={styles.accessory}>{renderAccessory()}</View>
      );
  }
}

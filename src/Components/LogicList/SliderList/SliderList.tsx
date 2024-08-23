import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


type SliderListProps<T> = {
  records?: T[];
  renderItem: (itemData: T) => ReactNode;
};


type HasId = { id?: number }

const SliderList = <T extends HasId>({
  records,
  renderItem,
}: SliderListProps<T>) => {
  
  
    let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 3,
          dots: false
          
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: false
          
        }
      }
    ]
  };
  
  
  
  const CategoryRender = records.length >= 1 ? (records.map((itemData) => (
        <div key={itemData.id}>
         {renderItem(itemData)}
        </div>
      
    ))) : (<h4>There are no data</h4>)
  
  return ( 
    <Slider {...settings}>
      {CategoryRender}
    </Slider>
  )
}

export default SliderList
import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';

import { useGetCryptosQuery } from '../services/cryptoApi';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import Loader from './Loader';

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
  
  const { data } = useGetCryptosQuery(100);
  const { data: cryptoNews } = useGetCryptoNewsQuery({  count: simplified ? 6 : 12 });
  console.log(cryptoNews);
  const filteredCryptoNews = cryptoNews?.filter((news) => news.description !== "");

  if (!cryptoNews) return <Loader />;

  const extractDomain = (url) => {
    // Remove protocol (http, https) and www if present
    let domain = url.replace(/(^\w+:|^)\/\/(www\.)?/,'');
    
    // Get the domain name
    domain = domain.split('/')[0];
    
    // Split by dots and return the first part (coindesk)
    return domain.split('.')[0];
  };

  return (
    <Row gutter={[24, 24]}>
      
      {filteredCryptoNews.map((eachNews, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={eachNews.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>{eachNews.title}</Title>
                {/* <img src={eachNews?.Image?.thumbnail?.contentUrl || demoImage} alt="" /> */}
              </div>
              <p>
                {eachNews.description ? (eachNews.description.length > 100 ? `${eachNews.description.substring(0, 100)}...` : eachNews.description) : "N/A"}
              </p>
              <div className="provider-container">
                <div>
                  {/* <Avatar src={eachNews.Source?.image?.thumbnail?.contentUrl || demoImage} alt="" /> */}
                  <Text className="provider-name">{extractDomain(eachNews.url)}</Text>
                </div>
                <Text>{moment(eachNews.date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;

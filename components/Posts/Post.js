import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
  width: '100%',
  overflow: 'hidden', // Hide overflow
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  transition: 'transform 0.5s ease',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 100%', // Each image takes the full width
}));

const Image = styled.img(() => ({
  width: '100%',
  height: 'auto',
  maxHeight: '300px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
`;

const NextButton = styled(Button)`
  right: 10px;
`;

const UserDetailsContainer = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  borderRadius: '5px',
  marginBottom: '10px',
  gap: '2px',
}));

const Initials = styled.div(() => ({
  backgroundColor: '#d0d0d0',
  color: '#000',
  fontSize: '20px',
  fontWeight: 'bold',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '5px',
}));

const FullName = styled.div(() => ({
  fontSize: '20px',
  fontWeight: 'bold',
  color: '#000',
}));

const Email = styled.div(() => ({
  fontSize: '16px',
  color: '#555',
}));

const getInitials = (name) => {
  const nameParts = name.split(' ');
  const initials = nameParts.map(part => part[0]).join('');
  return initials.toUpperCase();
};

const UserDetails = ({ name, email }) => {
  return (
    <UserDetailsContainer>
      <Initials>{getInitials(name)}</Initials>
      <div>
        <FullName>{name}</FullName>
        <Email>{email}</Email>
      </div>
    </UserDetailsContainer>
  );
};

const Post = ({ post, user }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % post.images.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + post.images.length) % post.images.length);
  };

  return (
    <PostContainer>
      <UserDetails name={"Leanne Graham"} email={"Sincere@april.biz"} />
      <CarouselContainer>
        <Carousel style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default Post;

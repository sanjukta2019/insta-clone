import { Box, Button, Flex, InputGroup, InputRightElement, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { NotificationsLogo, UnlikeLogo, CommentLogo} from "../../assets/constants";
import Comment from "../Comment/Comment";
import usePostComment from "../../hooks/usePostComment";
const PostFooter = ({post, username, isProfilePage}) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(1000);
  const {isCommenting, handlePostComment} = usePostComment()
  const [comment, setComment] = useState("")
  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment)
    setComment('')
  }

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
  };

  return (
    <>
    <Box my={10} marginTop={"auto"}>
    
      <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={4}>
        <Box onClick={handleLike} cursor={"pointer"} fontSize={18}>
          {!liked ? <NotificationsLogo /> : <UnlikeLogo />}
        </Box>

        <Box cursor={"pointer"} fontSize={18}>
          <CommentLogo />
        </Box>
      </Flex>

      <Text fontWeight={600} fontSize={"sm"}>
        {likes} likes
      </Text>

     {!isProfilePage && (
      <>
       <Text fontSize={"sm"} fontWeight={700}>
        {username} {" "}
        <Text as="span" fontWeight={400}>
          Feeling good
        </Text>
      </Text>
      <Text fontSize={"sm"} color="gray.500">
        View all 1,000 comments
      </Text>
      </>
     )}
      <Flex alignItems={"center"} gap={2} justifyContent={"space-between"} w={"full"} >
      <InputGroup>
      <Input varian = {"flushed"} placeholder={"Add a comment..."} fontSize={14}
      onChange={(e)=>setComment(e.target.value)} value={comment} />
      <InputRightElement>
      <Button fontSize={14} color={"blue.500"} fontWeight={600} cursor={"point"} _hover={{color:"white"}} bg={"transparent"}
      onClick={handleSubmitComment} isLoading={isCommenting} >
        Post</Button> 
      
      </InputRightElement>
      </InputGroup>

      </Flex>
      </Box>
    </>
  );
};

export default PostFooter;

















// import{Box, Flex, Text} from '@chakra-ui/react'
// import {  useState } from "react";
// import { NotificationsLogo } from '../../assets/constants';

// const PostFooter = () => {
//     const[liked, setLiked]=useState(false);
//     const[liked, setLiked]=useState(1000);

//     const handleLike = () => {
//         if(liked){
//             setLiked(false);
//             setLikes(likes - 1);
//          } else{
//             setLiked(true);
//             setLikes(likes +1);
            
//         }
//     };
//   return (
//     <>
//     <Flex alignItems={"center"} gap={4} w={"full"} pt={0} mb={2} mt={"auto"}>
//         <Box onClick={handlelike} cursor={"pointer"} fontSize={18} >
//         {!liked ? (<NotificationsLogo/>) : (<UnlikeLogo />)}
//         </Box>
//         <Box cursor="pointer" fontSize={18}>
//             <CommentLogo />
//         </Box>
//     </Flex>
//     <Text fontWeight={600} fontSize={"sm"} >
//         {likes} likes
//     </Text>
//     <Text fontWeight={700} fontSize={"sm"} >asaprogrammer_{" "}
//     <Text as='span' fontWeight={400} >
//         Feeling good
//     </Text>
//     </Text>
//     <Text fontSize={'sm'} color={gray}>
//         View all 1,000 comments
//     </Text>
//     </>
//   )
// }

// export default PostFooter
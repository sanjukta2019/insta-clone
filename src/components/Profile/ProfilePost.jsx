import { GridItem, Divider, Flex, VStack, Avatar, Box, Text, Image, 
ModalCloseButton, Modal, ModalBody, ModalContent, 
ModalOverlay, useDisclosure, 
Button} from "@chakra-ui/react";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Comment from '../Comment/Comment';
import PostFooter from "../FeedPosts/PostFooter";
import useUserProfileStore from "../../store/userProfileStore";
import useAuthStore from "../../store/authStore";
import useShowToast from "../../hooks/useShowToast";
import { useState } from "react";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import usePostStore from "../../store/postStore";

const ProfilePost = ({post}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const userProfile = useUserProfileStore((state) => state.userProfile);
    // const deletePost = useUserProfileStore((state) => state.deletePost);
    // const deletePost = usePostStore((state) => state.deletePost);

    const deleteUserPost = useUserProfileStore((state) => state.deletePost);
    const deletePostFromStore = usePostStore((state) => state.deletePost);

    const authUser = useAuthStore((state) => state.user);
    const showToast = useShowToast();
    const [isDeleting, setIsDeleting] = useState(false);
   
    console.log("POST OBJECT:", post);
console.log("POST ID:", post.id);
console.log("IMAGE:", post.imageURL);
    
    const handleDeletePost = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    setIsDeleting(true);

    try {
       
        // Delete Firestore document
        console.log("Deleting document:", post.id);
        await deleteDoc(doc(firestore, "posts", post.id));

        // Remove post from user's posts array
        const userRef = doc(firestore, "users", authUser.uid);

        console.log("Auth UID:", authUser.uid);
        console.log("Post ID:", post.id);
        console.log("Post createdBy:", post.createdBy);

        await updateDoc(userRef, {
            posts: arrayRemove(post.id),
            
        });

        console.log("User document updated");
        // deleteUserPost(post.id);
        // deletePost(post.id);
        deleteUserPost(post.id);
        deletePostFromStore(post.id);


        showToast("Success", "Post deleted successfully", "success");
        onClose();
    } catch (error) {
        console.error("Update failed:", error);
        showToast("Error", error.message, "error");
    } finally {
        setIsDeleting(false);
    }
    
};
console.log(post);
console.log("Image URL:", post.imageURL);
  return (
    <>    

    <GridItem cursor={"pointer"} borderRadius={4} overflow={"hidden"}
    borderColor={"whiteAlpha.300"} position={"relative"} aspectRatio={1/1}
    onClick={onOpen}>

    <Flex opacity={0} _hover={{opacity:1}} position={"absolute"}
    top={0} lef={0} right={0} bottom={0} bg={"blackAlpha.700"}
    transition={"all 0.3s ease"} zIndex={1} justifyContent={"center"}>

        <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
        <Flex>
            <AiFillHeart size={20} />
            <Text fontWeight={"bold"} ml={2}>
               {post.likes.length}
            </Text>
        </Flex>
        <Flex>
            <FaComment size={20} />
            <Text fontWeight={"bold"} ml={2}>
                {post.comments.length}
            </Text>
        </Flex>
    </Flex>   
</Flex>
<Image src={post.imageURL} alt='Profile Post' w={"100%"} h={"100%"} objectFit={"cover"} />
    </GridItem>
    
    <Modal isOpen={isOpen} onClose={onClose}
    isCentered={true} size={{base:"3xl", md:"5xl"}}>
        <ModalOverlay />
        <ModalContent>
        
        <ModalCloseButton />
        <ModalBody bg={"black"} pb={5}>
            <Flex gap="4" w={{base:"90%", sm:"70%", md:"full" }} mx={"auto"} 
            maxH={"90vh"}
            minH={"50vh"} >
            <Flex borderRadius={4} overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"} flex={1.5}
            justifyContent={"center"} alignItems={"center"}>
            <Image src={post.imageURL} alt='profile post' />            
            </Flex>
            <Flex flex={1} flexDir={"column"} px={10} display={{base:"none", md:"flex"}}>
                <Flex alignItems={"center"} justifyContent={"space-between"}>                
                <Flex alignItems={"center"} gap={4}>
                <Avatar src={userProfile.profilePicURL} size={"sm"} name='As a Programmer' />
                <Text fontWeight={"bold"} fontSize={12}>
                    {userProfile.username}
                </Text>
                </Flex>
                {authUser?.uid === userProfile.uid && (
                    <Button
                size={"sm"}
                bg={"transparent"}
                 _hover={{bg:"whiteAlpha.300", color:"red.600"}} 
                 borderRadius={4} p={1} onClick={handleDeletePost}>
                    <MdDelete size={20} cursor="pointer"/>
                </Button> 
                ) }              
            </Flex> 
            <Divider my={4} bg={"gray.500"} />
            <VStack w="full" alignItems={"start"} maxH={"350px"} overflowY={"auto"}>
                
                    {post.comments.map((comment, index )=> (
                        <Comment key={comment.id} comment={comment} />
                    ))}

                                            
            </VStack>
            <Divider my={4} bg={"gray.800"} />
            <PostFooter isProfilePage={true} post={post} />
            </Flex> 
            </Flex>            
        </ModalBody>
        </ModalContent>
    </Modal>
    </>
  )
}

export default ProfilePost;
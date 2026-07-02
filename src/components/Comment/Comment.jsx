import { Avatar, Flex, Text } from "@chakra-ui/react";

const Comment = ({ comment }) => {
  return (
    <Flex gap={4} mb={3}>
      <Avatar
        src={comment.profilePicURL}
        name={comment.username}
        size="sm"
      />

      <Flex direction="column">
        <Flex gap={2}>
          <Text fontWeight="bold" fontSize={12}>
            {comment.username}
          </Text>

          <Text fontSize={14}>
            {comment.comment}
          </Text>
        </Flex>

        <Text fontSize={12} color="gray.500">
          {new Date(comment.createdAt).toLocaleString()}
        </Text>
      </Flex>
    </Flex>
  );
};

export default Comment;
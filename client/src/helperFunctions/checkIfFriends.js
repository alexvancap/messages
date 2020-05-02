export const checkIfFriends = (friendId, friendList) => {
    const matchedFriends = friendList.filter(friend => friend.userID === friendId)
    return matchedFriends.length > 0
}
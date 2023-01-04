export const getJoinURL = (id: string, full?: boolean) => {
  return `${full ? "https://thebigsasha.github.io" : ""}/peerjs_test/join?peerid=${id}`;
};

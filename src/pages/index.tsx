export default function Index() {
  if (typeof window !== "undefined") {
    window.location.replace("/p/info");
  }
  return null;
}

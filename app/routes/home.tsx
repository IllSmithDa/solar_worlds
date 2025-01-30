import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Space World" },
    { name: "Home Page", content: "Welcome to our Solar System!" },
  ];
}

export default function Home() {

  return (
    <div>
      
    </div>
  )
}

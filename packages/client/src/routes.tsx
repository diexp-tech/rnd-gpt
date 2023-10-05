import RootLayout from "@/layouts/RootLayout";
import { GPT } from "@/pages/GPT";
import { MessagesProvider } from "@/store/messages";
import NotFound from "./pages/NotFound";

const routes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: (
      <MessagesProvider>
        <RootLayout>
          <GPT />
        </RootLayout>
      </MessagesProvider>
    ),
  },
];
export default routes;

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DirectionProvider, MantineProvider } from "@mantine/core";
import { Toaster } from "react-hot-toast";

export const router = createBrowserRouter([
  {
    path: "*",
    element: <App />,
    errorElement: <div>حدث خطأ</div>,
  },
]);
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DirectionProvider initialDirection="rtl" detectDirection>
      <MantineProvider defaultColorScheme="dark">
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools
            initialIsOpen={false}
            position="bottom"
            buttonPosition="bottom-left"
          />
        </QueryClientProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </MantineProvider>
    </DirectionProvider>
  </StrictMode>
);

import { RouterProvider } from "react-router-dom"
import { router } from "./routes/AppRoute"
import { Provider } from "react-redux"
import { store } from "./store/store"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { connectSocket } from "./utils/socket";

const queryClient = new QueryClient();
function App() {
  useEffect(() => {
    connectSocket()
  })
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
          <RouterProvider router={router} />
        </div>
      </Provider>
    </QueryClientProvider>
  )
}

export default App

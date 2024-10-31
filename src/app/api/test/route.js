
export async function GET(request) {
  try {
    data = {
        message: "Hello, World!"
    }

    return new Response(JSON.stringify(data));
  } catch (error) {
    return new Response(JSON.stringify(error));
  }
}

export default {
  async fetch(request, env) {
    console.log("Worker kena request!");

    return new Response("OK dari Worker", { status: 200 });
  }
};

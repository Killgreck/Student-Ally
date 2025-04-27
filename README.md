# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Developing

1.  Install dependencies: `npm install`
2.  Start the development server: `npm run dev`
3.  Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## Debugging with Visual Studio Code

To debug the application in Visual Studio Code:

1.  Ensure you have the [Node.js](https://nodejs.org/) runtime installed.
2.  Open the project in Visual Studio Code.
3.  Start the development server (`npm run dev`).
4.  In Visual Studio Code, go to the "Run and Debug" view (Ctrl+Shift+D or Cmd+Shift+D).
5.  Click on "Create a configuration" and select "Chrome" or "Edge", based on your preference.
6.  Edit the generated `launch.json` file. Here's an example configuration:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Next.js: Chrome",
      "url": "http://localhost:9002",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

Replace `"type": "chrome"` with `"type": "edge"` if you prefer to use Microsoft Edge.
Make sure the `"url"` matches the URL where your development server is running.
Press F5 to start debugging.

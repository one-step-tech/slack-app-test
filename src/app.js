const { App } = require("@slack/bolt");

// Initializes your app with your bot token and signing secret
const app = new App({
  token: "xoxb-4576681937735-4746451480528-ihJLv0nSZsaMSFl1OyfGb3zc",
  signingSecret: "eab4b464368013b80817038a60917346",
});

// ref. https://slack.dev/bolt-js/ja-jp/concepts#shortcuts
// callback_id が 'hello' と一致し type が 'message_action' と一致する場合のみミドルウェアが呼び出される
// app.shortcut(
//   { callback_id: "hello", type: "message_action" },
//   async ({ shortcut, ack, context, client, payload }) => {
//     try {
//       // ショートカットリクエストの確認
//       await ack();

//       console.log(payload.message.text);

//       // 組み込みの WebClient を使って views.open API メソッドを呼び出す
//       const result = await app.client.views.open({
//         // `context` オブジェクトに保持されたトークンを使用
//         token: context.botToken,
//         trigger_id: shortcut.trigger_id,
//         view: {
//           type: "modal",
//           title: {
//             type: "plain_text",
//             text: "My App",
//           },
//           close: {
//             type: "plain_text",
//             text: "Close",
//           },
//           blocks: [
//             {
//               type: "section",
//               text: {
//                 type: "mrkdwn",
//                 text: "About the simplest modal you could conceive of :smile:\n\nMaybe <https://api.slack.com/reference/block-kit/interactive-components|*make the modal interactive*> or <https://api.slack.com/surfaces/modals/using#modifying|*learn more advanced modal use cases*>.",
//               },
//             },
//             {
//               type: "context",
//               elements: [
//                 {
//                   type: "mrkdwn",
//                   text: "Psssst this modal was designed using <https://api.slack.com/tools/block-kit-builder|*Block Kit Builder*>",
//                 },
//               ],
//             },
//           ],
//         },
//       });

//       console.log(result);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// );

// Listens to incoming messages that contain "hello"
app.message("hello", async ({ message, say, client, logger }) => {
  // say() sends a message to the channel where the event was triggered
  await say({
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `xin chao <@${message.user}>!!@`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
    ],
    text: `Hey there <@${message.user}>!!!!!@@`,
  });

  try {
    // Call chat.postMessage with the built-in client
    const result = await client.chat.postMessage({
      channel: "C04HRSXS90R",
      text: `Welcome to the team, <@${body.user.id}>! 🎉 You can introduce yourself in this channel.`,
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

app.action("button_click", async ({ body, ack, say }) => {
  console.log("action buttion_clicked");

  // Acknowledge the action
  await ack();
  await say(`<@${body.user.id}> clicked the button!1`);
});

// Listen for a slash command invocation
app.command("/ticket", async ({ ack, body, client, logger }) => {
  // Acknowledge the command request
  await ack();

  try {
    // Call views.open with the built-in client
    const result = await client.views.open({
      // Pass a valid trigger_id within 3 seconds of receiving it
      trigger_id: body.trigger_id,
      // View payload
      view: {
        type: "modal",
        // View identifier
        callback_id: "view_1",
        title: {
          type: "plain_text",
          text: "Modal title",
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "!!Welcome -to a modal with _blocks_",
            },
            accessory: {
              type: "button",
              text: {
                type: "plain_text",
                text: "Click me!",
              },
              action_id: "button_abc",
            },
          },
          {
            type: "input",
            block_id: "input_c",
            label: {
              type: "plain_text",
              text: "What are your hopes and dreams?",
            },
            element: {
              type: "plain_text_input",
              action_id: "dreamy_input",
              multiline: true,
            },
          },
        ],
        submit: {
          type: "plain_text",
          text: "Submit",
        },
      },
    });
    logger.info(result);
  } catch (error) {
    logger.error(error);
  }
});

// app.event("message.im", async ({ event, client, logger }) => {
//   try {
//     // Call chat.postMessage with the built-in client
//     const result = await client.chat.postMessage({
//       channel: "C04HRSXS90R",
//       text: `Welcome to the team, <@${event.user.id}>! 🎉 You can introduce yourself in this channel.`,
//     });
//     logger.info(result);
//   } catch (error) {
//     logger.error(error);
//   }
// });

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log("⚡️ Bolt app is running!!!!!");
})();

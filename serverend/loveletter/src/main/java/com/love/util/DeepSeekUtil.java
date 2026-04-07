package com.love.util;

import com.alibaba.fastjson.JSONObject;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

public class DeepSeekUtil {

    // 👉 换成你自己的 DeepSeek API Key
    private static final String API_KEY = "";
    private static final String URL = "https://api.deepseek.com/v1/chat/completions";

    public static String generate(String prompt) throws Exception {
        CloseableHttpClient client = HttpClients.createDefault();
        HttpPost post = new HttpPost(URL);

        post.setHeader("Authorization", "Bearer " + API_KEY);
        post.setHeader("Content-Type", "application/json;charset=UTF-8");

        JSONObject body = new JSONObject();
        // ✅ DeepSeek 固定模型，不会不存在
        body.put("model", "deepseek-chat");
        body.put("messages", new Object[]{
                new JSONObject() {{
                    put("role", "system");
                    put("content", "你是一个擅长写浪漫情书的AI助手");
                }},
                new JSONObject() {{
                    put("role", "user");
                    put("content", prompt);
                }}
        });

        StringEntity entity = new StringEntity(body.toString(), "UTF-8");
        post.setEntity(entity);
        CloseableHttpResponse response = client.execute(post);

        String resStr = EntityUtils.toString(response.getEntity(), "UTF-8");
        System.out.println("DeepSeek返回：" + resStr);

        JSONObject resJson = JSONObject.parseObject(resStr);

        // 错误处理
        if (resJson.containsKey("error")) {
            String msg = resJson.getJSONObject("error").getString("message");
            throw new Exception("API错误：" + msg);
        }

        // 提取内容（不会空指针）
        String result = resJson.getJSONArray("choices")
                .getJSONObject(0)
                .getJSONObject("message")
                .getString("content");

        response.close();
        client.close();
        return result;
    }
}
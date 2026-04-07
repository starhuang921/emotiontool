package com.love.servlet;

import com.alibaba.fastjson.JSONObject;
import com.love.util.DeepSeekUtil;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;

@WebServlet("/api/love/letter")
public class LoveLetterServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // ########## 跨域代码（只加这里，绝对安全） ##########
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        // ##################################################

        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json;charset=UTF-8");
        PrintWriter out = resp.getWriter();

        try {
            String toName = "亲爱的";
            String fromName = "爱你的人";
            String style = "温柔浪漫";

            String prompt = "以"+style+"风格，写一封简短浪漫的情书，写给："+toName+"，落款："+fromName;
            String result = DeepSeekUtil.generate(prompt);

            JSONObject res = new JSONObject();
            res.put("code", 200);
            res.put("data", result);
            out.print(res);

        } catch (Exception e) {
            e.printStackTrace();
            JSONObject err = new JSONObject();
            err.put("code", 500);
            err.put("msg", "生成失败：" + e.getMessage());
            out.print(err);
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        // ########## 跨域代码（只加这里，绝对安全） ##########
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        // ##################################################

        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("application/json;charset=UTF-8");
        PrintWriter out = resp.getWriter();

        try {
            BufferedReader reader = req.getReader();
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            JSONObject json = new JSONObject();
            if (!sb.toString().trim().isEmpty()) {
                json = JSONObject.parseObject(sb.toString());
            }

            String toName = json.getString("toName") == null ? "亲爱的" : json.getString("toName");
            String fromName = json.getString("fromName") == null ? "爱你的人" : json.getString("fromName");
            String style = json.getString("style") == null ? "温柔浪漫" : json.getString("style");

            String prompt = "以"+style+"风格，写一封简短浪漫的情书，写给："+toName+"，落款："+fromName;
            String result = DeepSeekUtil.generate(prompt);

            JSONObject res = new JSONObject();
            res.put("code", 200);
            res.put("data", result);
            out.print(res);

        } catch (Exception e) {
            e.printStackTrace();
            JSONObject err = new JSONObject();
            err.put("code", 500);
            err.put("msg", "生成失败：" + e.getMessage());
            out.print(err);
        }
    }

    // 处理 OPTIONS 预检请求，解决跨域
    @Override
    protected void doOptions(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        resp.setHeader("Access-Control-Allow-Origin", "*");
        resp.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
        resp.setHeader("Access-Control-Allow-Headers", "Content-Type");
        resp.setStatus(HttpServletResponse.SC_OK);
    }
}
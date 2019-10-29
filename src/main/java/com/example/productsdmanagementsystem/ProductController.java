package com.example.productsdmanagementsystem;

import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ProductController {

    @GetMapping("/indexPaginated")
    // ArrayList<ArrayList<String>>
    public HashMap<String, Object> indexPaginated(@RequestParam("page") String page, @RequestParam("rows") String rows) {
        String offset = Integer.toString((Integer.parseInt(page) - 1) * Integer.parseInt(rows));
        ArrayList<HashMap<String, Object>> Rows = MySQL.Query("select * from products order by productId desc limit " + rows + " offset " + offset);
        ArrayList<HashMap<String, Object>> total = MySQL.Query("select count(*) as total from products");
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("rows", Rows);
        map.put("total", total.get(0).get("total"));
        //String json = "{\"total\":" + count.get(0).get(0) + ",\"rows\":" + data + "}";
        //return json;
        return map;
    }

    @GetMapping("/searchProduct")
    // ArrayList<ArrayList<String>>
    public HashMap<String, Object> indexPaginated(@RequestParam("page") String page, @RequestParam("rows") String rows, @RequestParam("term") String term) {
        String offset = Integer.toString((Integer.parseInt(page) - 1) * Integer.parseInt(rows));
        String sql = "select * from products";
        String sql2 = "select count(*) as total from products";
        if (term != ""){
            sql += " where productName like '%" + term + "%'";
            sql2 += " where productName like '%" + term + "%'";
        }
        sql += String.format(" order by productId desc limit %s offset %s",rows,offset);
        ArrayList<HashMap<String, Object>> Rows = MySQL.Query(sql);
        ArrayList<HashMap<String, Object>> total = MySQL.Query(sql2);
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("rows", Rows);
        map.put("total", total.get(0).get("total"));
        //String json = "{\"total\":" + count.get(0).get(0) + ",\"rows\":" + data + "}";
        //return json;
        return map;
    }

    @PostMapping("/products")
    // ArrayList<ArrayList<String>>
    public Object createProduct(@RequestBody String product) {
        String[] body = product.split("&");
        String productName = body[0].split("=")[1];
        String productLength = body[1].split("=")[1];
        String productWidth = body[2].split("=")[1];
        String productPrice = body[3].split("=")[1];
        String productOrigin = body[4].split("=")[1];
        String productQuantity = body[5].split("=")[1];
        String sql = String.format("insert into products (productName, productLength, productWidth, productPrice, productOrigin, productQuantity) values ('%s','%s','%s','%s','%s','%s')",
                productName,productLength,productWidth,productPrice,productOrigin,productQuantity);
//        String sql = "update students set firstName=" + firstName + ",lastName=" + lastName +
//                ",major=" + major + ",bio=" + bio + ",age=" + age + ",grade=" + grade +
//                ",gpa=" + gpa + ",gender=" + gender + " where studentId=" + studentId;
        int Rows = MySQL.Update(sql);
        return Rows;
    }

    @PostMapping("/products/{productId}")
    // ArrayList<ArrayList<String>>
    public Object editProduct(@PathVariable String productId, @RequestBody String product) {
        String[] body = product.split("&");
        String productName = body[0].split("=")[1];
        String productLength = body[1].split("=")[1];
        String productWidth = body[2].split("=")[1];
        String productPrice = body[3].split("=")[1];
        String productOrigin = body[4].split("=")[1];
        String productQuantity = body[5].split("=")[1];
        String sql = String.format("update products set productName='%s', productLength='%s', productWidth='%s', productPrice='%s', productOrigin='%s', productQuantity='%s' where productId=%s",
                productName,productLength,productWidth,productPrice,productOrigin,productQuantity,productId);
//        String sql = "update students set firstName=" + firstName + ",lastName=" + lastName +
//                ",major=" + major + ",bio=" + bio + ",age=" + age + ",grade=" + grade +
//                ",gpa=" + gpa + ",gender=" + gender + " where studentId=" + studentId;
        int Rows = MySQL.Update(sql);
        return Rows;
    }

    @GetMapping("/deleteProduct/{productId}")
    // ArrayList<ArrayList<String>>
    public Object deleteProduct(@PathVariable String productId) {
        String sql = String.format("delete from products where productId=%s",productId);
        int Rows = MySQL.Update(sql);
        return Rows;
    }
}

package com.example.productsdmanagementsystem;

public class Product {

    private String productName;
    private int productLength;
    private int productWidth;
    private float productPrice;
    private String productOrigin;
    private int productQuantity;

    public Product(String productName, int productLength, int productWidth, float productPrice, String productOrigin, int productQuantity) {
        this.productName = productName;
        this.productLength = productLength;
        this.productWidth = productWidth;
        this.productPrice = productPrice;
        this.productOrigin = productOrigin;
        this.productQuantity = productQuantity;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public void setProductLength(int productLength) {
        this.productLength = productLength;
    }

    public void setProductWidth(int productWidth) {
        this.productWidth = productWidth;
    }

    public void setProductPrice(float productPrice) {
        this.productPrice = productPrice;
    }

    public void setProductOrigin(String productOrigin) {
        this.productOrigin = productOrigin;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

    public String getProductName() {
        return this.productName;
    }

    public int getProductLength() {
        return this.productLength;
    }

    public int getProductWidth() {
        return this.productWidth;
    }

    public float getProductPrice() {
        return this.productPrice;
    }

    public String getProductOrigin() {
        return this.productOrigin;
    }

    public int getProductQuantity() {
        return this.productQuantity;
    }

    public String getInfo() {
        return this.productName + "" + this.productLength + "" + this.productWidth + "" + this.productPrice + "" + this.productOrigin + "" + this.productQuantity;
    }

}

var form, layer, element, row;
layui.use(['form', 'layedit', 'laydate', 'layer', 'element'], function () {
    form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate
        , element = layui.element;
});

$("#dg").datagrid({
    columns: [[
        { field: "productId", title: "产品Id", width: 80, align: "center" },
        { field: "productName", title: "名称", width: 80, align: "center" },
        { field: "productLength", title: "长度", width: 80, align: "center" },
        { field: "productWidth", title: "宽度", width: 80, align: "center" },
        { field: "productPrice", title: "价格", width: 80, align: "center" },
        { field: "productOrigin", title: "产地", width: 80, align: "center" },
        { field: "productQuantity", title: "数量", width: 80, align: "center" },
        { field: "created", title: "创建日期", width: 80, align: "center" },
        { field: "updated", title: "编辑日期", width: 80, align: "center" },
        {
            field: "action", title: "操作", width: 80, align: "center", formatter: function (value, row, index) {
                return `<i class="fa fa-eye mr-5" onclick="detailsProduct(this);"></i><i class="fa fa-edit mr-5" onclick="
editProduct(this);"></i><i class="fa fa-trash-o" onclick="deleteProduct(this);"></i>`;
            }
        },
    ]]
});

$('#dg').datagrid({
    onClickRow: function (index, field, value) {
        row = field;
    }
});

function detailsProduct(){
    setTimeout(function(){
        layer.open({
            btn: [],
            shade: 0,
            title: "产品信息",
            content: `<div class="mb-10"><span class="mr-5 bold">产品Id:</span><span>${row["productId"]}</span></div><div class="mb-10"><span class="mr-5 bold">名称:</span><span>${row["productName"]}</span></div><div  class="mb-10"><span class="mr-5 bold">长度:</span><span>${row["productLength"]}</span></div><div  class="mb-10"><span class="mr-5 bold">宽度:</span><span>${row["productWidth"]}</span></div><div  class="mb-10"><span class="mr-5 bold">价格:</span><span>${row["productPrice"]}</span></div><div  class="mb-10"><span class="mr-5 bold">产地:</span><span>${row["productOrigin"]}</span></div><div  class="mb-10"><span class="mr-5 bold">数量:</span><span>${row["productQuantity"]}</span></div><div  class="mb-10"><span class="mr-5 bold">创建日期:</span><span>${row["created"]}</span></div><div  class="mb-10"><span class="mr-5 bold">编辑日期:</span><span>${row["updated"]}</span></div>`

        });
    }, 1000);
}

function createProduct(){
    setTimeout(function(){
        layer.open({
            btn: [],
            shade: 0,
            title: "新建产品",
            content: `<form class="layui-form layui-form-pane" action="">
                   <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">长度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productLength" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">宽度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productWidth" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">价格</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productPrice" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">产地</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productOrigin" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">数量</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productQuantity" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit",function(e){
            e.preventDefault();
            createProductPost();
        });
    }, 1000);
}

function createProductPost(){
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
    var productName = inputs[0].value;
    var productLength = inputs[1].value;
    var productWidth = inputs[2].value;
    var productPrice = inputs[3].value;
    var productOrigin = inputs[4].value;
    var productQuantity = inputs[5].value;
    $.ajax({
        type: "post",
        url: `http://localhost:8080/products`,
        data: {
            "productName": productName, "productLength": productLength, "productWidth": productWidth, "productPrice": productPrice, "productOrigin": productOrigin, "productQuantity": productQuantity
        },
        dataType: "json",
        success: function (data) {
            if (data == 1){
                layer.closeAll();
                layer.msg("产品已创建");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
        }
    });
}

function editProduct(){
    setTimeout(function(){
        layer.open({
            btn: [],
            shade: 0,
            title: "编辑产品",
            content: `<form class="layui-form layui-form-pane" action="">
                              <div class="layui-form-item">
                    <label class="layui-form-label">名称</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["productName"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">长度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productLength" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${row["productLength"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">宽度</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productWidth" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["productWidth"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">价格</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productPrice" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${row["productPrice"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">产地</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productOrigin" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["productOrigin"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">数量</label>
                    <div class="layui-input-inline">
                      <input type="text" name="productQuantity" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${row["productQuantity"]}">
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">保存</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit",function(e){
            e.preventDefault();
            editProductPost();
        });
    }, 1000);
}

function editProductPost(){
    var form = document.getElementsByTagName("form")[0];
    var id = row.productId;
    var inputs = form.getElementsByTagName("input");
    var productName = inputs[0].value;
    var productLength = inputs[1].value;
    var productWidth = inputs[2].value;
    var productPrice = inputs[3].value;
    var productOrigin = inputs[4].value;
    var productQuantity = inputs[5].value;
    $.ajax({
        type: "post",
        url: `http://localhost:8080/products/${id}`,
        data: {
            "productName": productName, "productLength": productLength, "productWidth": productWidth, "productPrice": productPrice, "productOrigin": productOrigin, "productQuantity": productQuantity
        },
        dataType: "json",
        success: function (data) {
            if (data == 1){
                layer.closeAll();
                layer.msg("产品已编辑");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
        }
    });
}

function deleteProduct() {
    setTimeout(function(){
        layer.open({
        btn: [],
        shade: 0,
        title: "删除产品",
        content: `<div><div class="mb-15 tc">确定删除产品?</div><div class="tr"><button id="buttonDelete" type="submit" class="layui-btn layui-btn-danger">删除</button></div></div>`
        });
        document.getElementById("buttonDelete").addEventListener("click",function(e){
            deleteProductPost();
        });
    }, 1000);
}

function deleteProductPost() {
    var id = row.productId;
    $.ajax({
        type: "get",
        url: `http://localhost:8080/deleteProduct/${id}`,
        dataType: "json",
        success: function (data) {
            if (data == 1) {
                layer.closeAll();
                layer.msg("产品已删除");
                $('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}

function searchProduct(){
    var searchTerm = document.getElementById('inputSearchProduct').value;
    var searchTermFinal = "";
    if (searchTerm !== ""){
        searchTermFinal = searchTerm;
    }
    $("#dg").datagrid({
        url: `http://localhost:8080/searchProduct?term=${searchTermFinal}`,
        method: 'get',
        onLoadSuccess: function (data) {
        }
    });

}

function main(){
    $("#dg").datagrid({
        url: `http://localhost:8080/indexPaginated`,
        method: 'get',
        onLoadSuccess: function (data) {
        }
    });
}

main();
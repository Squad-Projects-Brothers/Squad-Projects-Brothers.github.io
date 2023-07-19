<?php
echo json_encode(
   array(
      array(
        "id" => "1", 
        "categoria" =>"bebida",
        "nome" => "Pepsi", 
        "descricao" => "Pepsi é uma bebida carbonatada à base de cola, similar à Coca-Cola, mas com seu próprio sabor característico. A fórmula inclui água gaseificada, açúcar, extrato de cola, cafeína, acidulante ácido fosfórico e aroma natural. Cada 200 ml contém aproximadamente 89 kcal e 9 mg de sódio.", 
        "valor" => "3,29", 
        "unidade" => "ml", 
        "quantidade" => "350", 
        "imagem" => "https://media.istockphoto.com/id/459396911/pt/foto/pepsi-pode-com-got%C3%ADculas-de-%C3%A1gua.jpg?s=2048x2048&w=is&k=20&c=QePAF55GUm0zkLysxl2ekn-n34iX3TDS00bGrH41pQY=" 
      ),
      array(
        "id" => "2", 
        "categoria" =>"bebida",
        "nome" => "Guaraná", 
        "descricao" => "Guaraná é uma bebida brasileira famosa pelo sabor adocicado e aroma característico do fruto de guaraná. É uma bebida carbonatada que contém água gaseificada, açúcar, extrato de guaraná, cafeína, acidulante ácido fosfórico e aroma natural. Cada 200 ml contém aproximadamente 80 kcal e 9 mg de sódio.", 
        "valor" => "2,99", 
        "unidade" => "ml", 
        "quantidade" => "350", 
        "imagem" => "https://www.shutterstock.com/image-photo/rio-de-janeiro-rj-brazil-600w-2299777743.jpg" 

      ),
      array(
        "id" => "3",
        "categoria" =>"bebida", 
        "nome" => "Sprite", 
        "descricao" => "Sprite é uma bebida gasificada de limão, conhecida por seu sabor refrescante e ausência de cafeína. É composta por água gaseificada, açúcar, acidulante ácido cítrico, regulador de acidez citrato de sódio, aroma natural de limão e antioxidante ácido ascórbico. Cada 200 ml contém aproximadamente 80 kcal e 20 mg de sódio.", 
        "valor" => "2,99", 
        "unidade" => "ml", 
        "quantidade" => "350", 
        "imagem" => "https://www.shutterstock.com/image-photo/moscow-russia-june-13-2015-600w-286752968.jpg" 

      ),
      array(
        "id" => "4", 
        "categoria" =>"sobremesa", 
        "nome" => "Bolo-de-Fuba", 
        "descricao" => "Bolo de Fubá. Um bolo simples e reconfortante, com o delicioso sabor do fubá. Perfeito para acompanhar um café quentinho!", 
        "valor" => "11,00", 
        "medida" => "fatia", 
        "imagem" => "https://www.shutterstock.com/image-photo/homemade-round-sponge-cake-chiffon-600w-1738831742.jpg" 

      ),
      array(
        "id" => "5", 
        "categoria" =>"sobremesa", 
        "nome" => "Bolo-de-Amendoim", 
        "descricao" => "Bolo de Amendoim. Um bolo irresistível, feito com uma generosa quantidade de amendoim triturado. Para os amantes desse saboroso ingrediente!", 
        "valor" => "13,00", 
        "medida" => "fatia", 
        "imagem" => "https://www.shutterstock.com/image-photo/cake-dulce-de-leche-cream-600w-2300738625.jpg" 
      ),
      array(
        "id" => "6",
        "categoria" =>"sobremesa", 
        "nome" => "Bolo-de-Laranja", 
        "descricao" => "Bolo de Laranja. Um bolo cítrico e refrescante, feito com suco de laranja fresco e raspas da casca. Uma explosão de sabor!", 
        "valor" => "12,00", 
        "medida" => "fatia", 
        "imagem" => "https://www.shutterstock.com/image-photo/orange-pound-cake-moist-loaf-600w-2284729027.jpg" 
      ),
      array(
        "id" => "7", 
        "categoria" => "comida", 
        "nome" => "margherita",
        "descricao" => "Pizza Margherita. Deliciosa pizza clássica italiana feita com molho de tomate, queijo mussarela fresco, manjericão e um fio de azeite. Uma combinação perfeita de sabores!", 
        "valor" => "20,00", 
        "medida" => "unidade", 
        "imagem" => "https://www.shutterstock.com/image-photo/homemade-margherita-pizza-healthy-plate-600w-1735867118.jpg" 
      ),
      array(
        "id" => "8", 
        "categoria" => "comida", 
        "nome" => "calabresa", 
        "descricao" => "Pizza Calabresa. Uma pizza saborosa, coberta com generosas fatias de calabresa, queijo mussarela e molho de tomate. Um clássico que agrada a todos!", 
        "valor" => "25,00", 
        "medida" => "unidade", 
        "imagem" => "https://www.shutterstock.com/image-photo/slice-pepperoni-pizza-brazilian-called-600w-1700217022.jpg" 
      ),
      array(
        "id" => "9", 
        "categoria" => "comida", 
        "nome" => "quatro-queijos", 
        "descricao" => "Pizza Quatro Queijos. Uma explosão de queijos deliciosos, com uma mistura perfeita de queijo mussarela, queijo gorgonzola, queijo provolone e parmesão. Irresistível!", 
        "valor" => "30,00", 
        "medida" => "unidade", 
        "imagem" => "https://www.shutterstock.com/image-photo/slice-hot-italian-pizza-stretching-600w-2198928269.jpg" 
      ),
      array(
        "id" => "10", 
        "categoria" => "comida", 
        "nome" => "Portuguesa", 
        "descricao" => "Pizza Portuguesa. Uma pizza completa, com molho de tomate, queijo mussarela, presunto, ovos, cebola, azeitonas e pimentão. Saborosa e bem equilibrada!", 
        "valor" => "28,00", 
        "medida" => "unidade", 
        "imagem" => "https://www.shutterstock.com/image-photo/brazilian-pizza-mozzarella-ham-onion-600w-2266135065.jpg" 

      ),
      array(
        "id" => "11", 
        "categoria" => "comida", 
        "nome" => "espaguete", 
        "descricao" => "Espaguete à bolonhesa. Um prato clássico da culinária italiana, com macarrão espaguete servido com molho de carne à bolonhesa e queijo parmesão ralado. Uma explosão de sabores!", 
        "valor" => "22,00", 
        "medida" => "unidade", 
        "imagem" => "https://www.shutterstock.com/image-photo/delicious-spaghetti-served-on-black-600w-413580649.jpg" 
      ),
      array(
        "id" => "12", 
        "categoria" => "comida",
        "nome" => "ravioli",
        "descricao" => "Ravióli de queijo. Deliciosos raviólis recheados com queijo, servidos com molho de tomate e queijo parmesão ralado. Um prato refinado e saboroso!", 
        "valor" => "24,00", 
        "medida" => "unidade", 
        "imagem" => "https://www.shutterstock.com/image-photo/italian-ravioli-pasta-spinach-ricotta-600w-1069544165.jpg" 
      ),
      array(
        "id" => "13", 
        "categoria" => "comida",
        "nome" => "Penne", 
        "descricao" => "Penne ao molho de tomate. Um prato simples e saboroso, com macarrão penne servido com molho de tomate fresco, manjericão e queijo parmesão ralado. Uma opção clássica!", 
        "valor" => "20,00", 
        "medida" => "unidade", 
        "imagem" => "https://www.shutterstock.com/image-photo/penne-sausages-tomato-sauce-parmesan-600w-1751143595.jpg" 
      )
   )
);
?>
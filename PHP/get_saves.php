<?php
    session_start();
    include_once("connexion.php");
    header("Content-Type: text/plain; charset=utf-8");

    try 
    {
        //if($DEBUG) echo "\ndebut";
        if(isset($_SESSION["user_id"]))
        {
            //if($DEBUG) echo "\nid trouve";
            $response["received"] = true;
            $user_id = $_SESSION["user_id"];

            $query = "SELECT * FROM saves WHERE user_id = :user_id ORDER BY id ASC";

            $stmt = $pdo->prepare($query);
            $stmt->bindValue(":user_id", $user_id, PDO::PARAM_INT);
            $stmt->execute();

            $info = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if($info)
            {
                $response["found"] = true;
                for($i = 0 ; $i < 5 ; $i++)
                {
                    $_SESSION["saves"] = $info;
                    $response["saves"][$i]["title"] = $info[$i]["title"];
                    $response["saves"][$i]["init_date"] = date("Y/m/d → H:i:s", $info[$i]["init_date"]);
                }
                //if($DEBUG) var_dump($response["saves"][2]);
                //if($DEBUG) echo "\n info trouve";
                //if($DEBUG) var_dump($info);
                //if($DEBUG) var_dump($response);
                //if($DEBUG) var_dump($_SESSION);
            }
            else 
            {
                $response["found"] = false;
                include_once("create_saves.php");
            }
        }
        else $response["received"] = false;
        
        echo json_encode($response);

    } 
    catch (Exception $e) 
    {
        error_log("login.php -> Exception: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(["type" => "error", "message" => $e->getMessage()]);
        exit;
    }
?>
/**
 * @since 2015-02-26 (API 1)
 * @author Choseul <chocoslime05@naver.com>
 * @namespace
 */
Pool.IO = {};

/**
 * 문자열을 파일이나 OutputStream 및 Writer에 저장합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File|OutputStream|Writer} path - 문자열을 저장할 파일의 경로 및 파일 객체, OutputStream 및 Writer
 * @param {String} str - 문자열을 저장할 파일의 경로 및 파일 객체
 */
Pool.IO.saveAllLines = function(path, str){
    try{
        var file = null;
        var bw = null;
        
        if(path instanceof java.io.File){
            file = path;
        }else if(path instanceof String){
            file = new java.io.File(path);
        }else if(path instanceof java.io.OutputStream){
            file = null;
            bw = new java.io.BufferedWriter(new java.io.FileWriter(new java.io.OutputStreamWriter(file)));
        }else if(path instanceof java.io.Writer){
            bw = path;
        }else{
            throw new Error("Illegal argument type");
        }
        
        if(file !== null){
            file.getParentFile().mkdirs();
        }
        if(bw === null){
            bw = new java.io.BufferedWriter(new java.io.FileWriter(file));
        }
        
        bw.write(str);
        bw.close();
    }catch(e){
        Pool.showError(e);
    }
};

/**
 * 파일이나 InputStream 및 BufferedReader에서 문자열을 읽어옵니다
 * 
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File|InputStream|BufferedReader} path - 문자열을 읽을 파일의 경로 및 파일 객체, InputStream 및 BufferedReader
 * @return {String} 파일 내의 문자열
 */
Pool.IO.readAllLines = function(path){
    try{
        var file = null;
        var br = null;
        
        if(path instanceof java.io.File){
            file = path;
        }else if(path instanceof String){
            file = new java.io.File(path);
        }else if(path instanceof java.io.InputStream){
            file = null;
            br = new java.io.BufferedReader(new java.io.FileReader(new java.io.InputStreamReader(file)));
        }else if(path instanceof java.io.BufferedReader){
            br = path;
        }else{
            throw new Error("Illegal argument type");
        }
        
        if(file !== null && !file.exists()){
            return null;
        }
        if(br === null){
            new java.io.BufferedReader(new java.io.FileReader(file));
        }
        
        var tmp = null, sb = new java.lang.StringBuffer();
        while((tmp = br.readLine()) !== null){
            sb.append(tmp);
            sb.append("\n");
        }
        
        br.close();
        return sb.toString() + "";
    }catch(e){
        Pool.showError(e);
        return null;
    }
};

/**
 * 주어진 파일을 삭제합니다
 * 
 * @since 2015-02-26 (API 1)
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File} path - 삭제할 파일의 경로 및 파일 객체
 * @return {Boolean} 파일 삭제 성공 여부
 */
Pool.IO.removeFile = function(path){
    try{
        var file = null;
        if(path instanceof java.io.File){
            file = path;
        }else if(path instanceof String){
            file = new java.io.File(path);
        }else{
            throw new Error("Illegal argument type");
        }
        
        return file["delete"](); //delete가 자바스크립트 키워드라...
    }catch(e){
        Pool.showError(e);
        return false;
    }
};

/**
 * 주어진 파일이나 스트림을 다른 곳으로 복사합니다
 *
 * @since 2015-02-26 (API 1)
 * @author onebone <jyc0410@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File|InputStream} source - 원본 파일의 경로 혹은 파일 객체 및 InputStream
 * @param {String|File} target - 복사될 파일의 경로 혹은 파일 객체
 * @param {Boolean} deleteSourceAfterCopy - 복사 후 원본 파일을 삭제할 지의 여부
 * @return {Boolean} 파일 복사 성공 여부
 */
Pool.IO.copyFile = function(source, target, deleteSourceAfterCopy){
    try{
        var file = null;
        var bis = null;
        
        if(source instanceof java.io.File){
            file = source;
        }else if(source instanceof String){
            file = new java.io.File(source);
        }else if(source instanceof java.io.InputStream){
            bis = new java.io.BufferedInputStream(source);
        }else{
            throw new Error("Illegal argument type");
        }
        
        if(file !== null && !file.exists()){
            return false;
        }
        
        if(target instanceof java.io.File){
            target = target;
        }else if(target instanceof String){
            target = new java.io.File(target);
        }else{
            throw new Error("Illegal argument type");
        }
        
        target.getParentFile().mkdirs();
        
        if(bis === null){
            bis = new java.io.BufferedInputStream(new java.io.FileInputStream(file));
        }
        var bos = new java.io.BufferedOutputStream(new java.io.FileOutputStream(target));
        
        var buf = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 4096);
        var count = 0;
        
        while((count = bis.read(buf)) >= 0){
            bos.write(buf, 0, count);
        }
        
        bis.close();
        bos.close();
        
        if(file !== null && deleteSourceAfterCopy){
            Pool.IO.removeFile(file);
        }
        return true;
    }catch(e){
        Pool.showError(e);
        return false;
    }
};

/**
 * 파일이나 디렉토리(내부의 모든 디렉토리 및 파일을 포함한)를 압축합니다
 *
 * @since 2015-03-08 (API 1)
 * @author CI-CodeInside <scgtdy7151@gmail.com>
 * @param {String|File} inputPath - 압축을 할 파일 및 폴더
 * @param {String|File} outputPath - 출력할 zip 파일
 */
Pool.IO.zip = function(input, output){
    try{
        if(input instanceof java.io.File){
            var inputPath = input;
        }else if(input instanceof String){
            var inputPath = new java.io.File(input);
        }else{
            throw new Error("Illegal argument type");
        }
        
        if(inputPath !== null && !inputPath.exists()){
            return false;
        }
        
        if(output instanceof java.io.File){
            var outputPath = output;
        }else if(output instanceof String){
            var outputPath = new java.io.File(output);
        }else{
            throw new Error("Illegal argument type");
        }
        
        outputPath.getParentFile().mkdirs();
        
        var fileList = [];
        function getEveryFiles(dir){
            try{
                var files = dir.listFiles();
                for(var e in files){
                    if(files[e].isFile()){
                        fileList.push(files[e].getAbsolutePath());
                    }else{
                        getEveryFiles(files[e]);
                    }
                }
            }catch(e){
                print(e);
            }
        };
        getEveryFiles(inputPath);
        var fos = new java.io.FileOutputStream(outputPath);
        var zos = new java.util.zip.ZipOutputStream(fos);
        for(var e in fileList){
            var ze = new java.util.zip.ZipEntry(fileList[e].substring(inputPath.getAbsolutePath().length()+1, fileList[e].length()));
            zos.putNextEntry(ze);
            var fis = new java.io.FileInputStream(fileList[e]);
            var buffer = java.lang.reflect.Array.newInstance(java.lang.Byte.TYPE, 1024);
            var content;
            while((content = fis.read(buffer)) > 0){
                zos.write(buffer, 0, content);
            }
            zos.closeEntry();
            fis.close();
        }
        zos.close();
        fos.close();
    }catch(err){
        print(err);
    }
};

/**
 * 주어진 압축 파일을 압축 해제 합니다
 *
 * @since 2015-02-26 (API 1)
 * @author affogatoman <colombia2@naver.com>
 * @author ChalkPE <amato0617@gmail.com>
 * @param {String|File} file - zip 파일의 경로 혹은 파일 객체
 * @param {String|File} target - 압축을 풀 폴더의 경로
 */
Pool.IO.unZip = function(file, target) {
    try{
        var zip = new java.util.zip.ZipFile(file);
        var elements = zip.entries();
        var element;
        
        if(target instanceof java.io.File){
            target = target;
        }else if(target instanceof String){
            target = new java.io.File(target);
        }else{
            throw new Error("Illegal argument type");
        }
        
        while(elements.hasNextElement()) {
            element = elements.nextElement();
            Pool.IO.copyFile(zip.getInputStream(element), new java.io.File(target, element.getName()));
        }
        zip.close();
    }catch(e){
        Pool.showError(e);
    }
};

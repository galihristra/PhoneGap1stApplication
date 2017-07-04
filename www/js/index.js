/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
$('#reposHome').bind('pageinit', function (event) {
    loadRepos();
});

$('body').on('pageshow', '#reposDetail', function (event) {
    var owner = getUrlVars().owner;
    var name = getUrlVars().name;
    loadRepoDetail(owner, name);
    
    $('#saveBtn').bind("click", saveFave);
    checkFave();
});

function loadRepoDetail(owner, name){
    $.ajax("https://api.github.com/repos/" + owner + "/" + name).done(function(data) {
        console.log(data);
        
        var repo = data;
        
        $('#repoName').html("<a href='" + repo.homepage + "'>" + repo.name + "</a>");
        $('#description').text(repo.description);
        $('#forks').html("<strong>Forks:</strong>" + repo.forks + "<br><strong>Watchers:</strong>" + repo.watchers);
        
        $('#avatar').attr('src', repo.owner.avatar_url);
        $('#ownerName').html("<strong>Owner:</strong> <a href='" + repo.owner.url + "'>" + repo.owner.login + "</a>");
    })
}

function loadRepos() {
    $.ajax("https://api.github.com/legacy/repos/search/javascript").done(function (data) {
        var i, repo;
        $.each(data.repositories, function (i, repo) {
            $("#allRepos").append("<li><a href='repo-detail.html?owner=" + repo.username + "&name=" + repo.name + "'>" +
                "<h4>" + repo.name + "</h4>" +
                "<p>" + repo.username + "</p></a></li>");
        });
        $('#allRepos').listview('refresh');
    });
}

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++){
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

function checkFave(){
    db.transaction(checkFaveDB, txError);
}
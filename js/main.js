let siteNameInput=document.getElementById('siteName')
let siteUrlInput=document.getElementById('siteUrl')
let alertSection=document.getElementById('alertSection')
let siteName= /^([A-Z]|[a-z]|[0-9]){3,}$/
let siteUrl= /^((https|http):\/\/([A-Z]|[a-z]|[0-9]){1,}(.com)?\/?)|(www.([A-Z]|[a-z]|[0-9]){1,}.com)$/
let siteContainer=[]
var flag=false;
if(localStorage.getItem('allSites')){
    siteContainer=JSON.parse(localStorage.getItem('allSites'))
    showSite();
    
};
function addSite(){
    if(flag){
        let site={
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value,
        }
        siteContainer.push(site)
        showSite()
        clear()
        refresh()
        localStorage.setItem('allSites',JSON.stringify(siteContainer))
    }else{
        alertSection.classList.remove('d-none')
    }
}

function showSite(){
    let cartona=""
    for(i=0;i<siteContainer.length;i++){
        cartona+=`
        <td>${i+1}</td>
        <td>${siteContainer[i].siteName}</td>
        <td><a target="_blank" href="${siteContainer[i].siteUrl}"><button class="btn btn-outline-info "><i class="fa-solid fa-eye pe-2"></i>Visit</button></a></td>
        <td><button onclick="deleteSite(${i})" class="btn btn-outline-danger"><i class="fa-solid fa-trash pe-2"></i>Delete</button></td>

        `
    }
    document.getElementById('demo').innerHTML=cartona
}
function clear(){
    siteNameInput.value=""
    siteUrlInput.value=""
}
function deleteSite(index){
    siteContainer.splice(index,1)
    showSite()
    localStorage.setItem('allSites',JSON.stringify(siteContainer))
}
function validSiteRegex(valid){
    let validate={
         siteName: /^([A-Z]|[a-z]|[0-9]){3,}$/,
         siteUrl: /^((https|http):\/\/([A-Z]|[a-z]|[0-9]){1,}(.com)?\/?)|(www.([A-Z]|[a-z]|[0-9]){1,}.com)$/
     }
     if(validate[valid.id].test(valid.value)){
        valid.classList.replace('is-invalid', 'is-valid')
        flag=true;
        return true
       
     }else{
         valid.classList.add('is-invalid')
         flag=false;
        return false
     }
}
function closeAlert(){
    alertSection.classList.add('d-none')
}

function refresh(){
    window.location.reload(true);
}

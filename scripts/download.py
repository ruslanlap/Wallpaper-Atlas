#!/usr/bin/env python3
"""Download pinned wallpaper originals from the local catalog; standard library only."""
import argparse,json,pathlib,urllib.request,urllib.parse,tempfile,os,sys

def main():
    p=argparse.ArgumentParser(description=__doc__)
    p.add_argument('--platform',choices=['all','desktop','mobile'],default='all')
    p.add_argument('--limit',type=int,default=12)
    p.add_argument('--output',type=pathlib.Path,default=pathlib.Path('downloads'))
    p.add_argument('--list',action='store_true',help='List matching files without downloading')
    args=p.parse_args()
    if args.limit<1:p.error('--limit must be positive')
    catalog=json.loads((pathlib.Path(__file__).resolve().parents[1]/'data/wallpapers.json').read_text())
    selected=[x for x in catalog if args.platform=='all' or (x['height']>x['width'])==(args.platform=='mobile')][:args.limit]
    failures=0
    for x in selected:
        url=urllib.parse.urlsplit(x['url'])
        if url.scheme!='https' or url.hostname!='raw.githubusercontent.com':raise ValueError('Unexpected download host')
        print(f"{x['id']}: {x['title']} ({x['width']} x {x['height']})")
        if args.list:continue
        args.output.mkdir(parents=True,exist_ok=True)
        name=''.join(c for c in x['id'] if c.isalnum() or c in '-_')+pathlib.Path(url.path).suffix
        target=args.output/name
        if target.exists():print('  Already exists; skipped');continue
        temp=None
        try:
            with urllib.request.urlopen(x['url'],timeout=60) as response, tempfile.NamedTemporaryFile(dir=args.output,delete=False) as dest:
                temp=pathlib.Path(dest.name)
                while chunk:=response.read(1024*1024):dest.write(chunk)
            os.replace(temp,target)
        except (OSError,ValueError) as error:
            failures+=1;print(f'  Failed: {error}',file=sys.stderr)
        finally:
            if temp and temp.exists():temp.unlink()
    return bool(failures)
if __name__=='__main__':sys.exit(main())
